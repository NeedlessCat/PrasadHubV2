import validator from "validator";
import formModel from "../models/formModel.js";
import razorpay from "razorpay";

import nodemailer from "nodemailer";
//API for adding the form
const addForm = async (req, res) => {
  try {
    const {
      fullname,
      parent,
      email,
      mobile,
      identity,
      idnumber,
      category,
      streetname,
      district,
      state,
      country,
      pin,
      amount,
    } = req.body;

    //checking for all data to add form..
    if (
      !fullname ||
      !parent ||
      !email ||
      !mobile ||
      !identity ||
      !idnumber ||
      !category ||
      !streetname ||
      !district ||
      !state ||
      !country ||
      !pin ||
      !amount
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    //validating email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    const formData = {
      fullname,
      parent,
      email,
      mobile,
      identity,
      idnumber,
      category,
      streetname,
      district,
      state,
      country,
      pin,
      amount,
    };

    const newForm = new formModel(formData);
    await newForm.save();
    res.json({ success: true, message: "Application Submitted and Saved" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get form details
const getEntry = async (req, res) => {
  try {
    const { category, email } = req.query;
    if (!category || !email) {
      return res.json({
        success: false,
        message: "Category and email are required.",
      });
    }
    const entryData = await formModel.findOne({ category, email });

    if (!entryData) {
      return res.json({ success: false, message: "Entry not found." });
    }

    res.json({ success: true, entryData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to update the entry
const updateEntry = async (req, res) => {
  try {
    const {
      fullname,
      parent,
      email, // used for lookup only, not updating
      mobile,
      identity,
      idnumber,
      category,
      streetname,
      district,
      state,
      country,
      pin,
      amount,
    } = req.body;

    // Validate required fields
    if (
      !fullname ||
      !parent ||
      !email ||
      !mobile ||
      !identity ||
      !idnumber ||
      !category ||
      !streetname ||
      !district ||
      !state ||
      !country ||
      !pin ||
      !amount
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Perform the update operation without modifying the email field
    await formModel.findOneAndUpdate(
      { category, email }, // Query to find the document
      {
        fullname,
        parent,
        mobile,
        identity,
        idnumber,
        category,
        streetname,
        district,
        state,
        country,
        pin,
        amount,
      }
    );

    res.json({ success: true, message: "Form Details Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//API to make payment of amount
const paymentRazorpay = async (req, res) => {
  try {
    const formData = req.body;

    if (!formData) {
      return res.json({
        success: false,
        message: "Payment details are missing",
      });
    }

    // Save incomplete form
    const newForm = new formModel({ ...formData, payment: false });
    const savedForm = await newForm.save();

    // Create Razorpay order
    const options = {
      amount: formData.amount * 100, // Amount in paise
      currency: "INR",
      receipt: savedForm._id.toString(),
    };

    const order = await razorpayInstance.orders.create(options);
    // Update the form with the Razorpay order ID
    await formModel.findByIdAndUpdate(savedForm._id, {
      razorpayOrderId: order.id,
    });
    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email provider (e.g., "gmail", "outlook")
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
  },
});

// Function to send email
const sendDonationEmail = async (formData) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender email address
    to: formData.email, // Recipient email address
    subject: "Thank You for Your Donation!",
    html: `
      <h3>Dear ${formData.fullname},</h3>
      <p>Thank you for your generous donation. Here are the details:</p>
      <ul>
        <li><strong>Donor Name:</strong> ${formData.fullname}</li>
        <li><strong>Category:</strong> ${formData.category}</li>
        <li><strong>Amount:</strong> ₹${formData.amount}</li>
        <li><strong>Transaction ID:</strong> ${formData.razorpayOrderId}</li>
      </ul>
      <p>Your contribution will make a significant impact. We truly appreciate your support!</p>
      <p>Best regards,</p>
      <p>The Donation Team</p>
    `,
  };

  // Send email
  await transporter.sendMail(mailOptions);
};

const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    console.log(req.body);

    // Update form entry
    const updatedForm = await formModel.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      { payment: true },
      { new: true } // Return the updated document
    );
    console.log(updatedForm);

    if (!updatedForm) {
      return res.json({
        success: false,
        message: "No matching form found for the given Razorpay order ID",
      });
    }

    // Send donation email
    await sendDonationEmail(updatedForm);

    res.json({ success: true, message: "Payment successful", updatedForm });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addForm, getEntry, updateEntry, paymentRazorpay, verifyRazorpay };
