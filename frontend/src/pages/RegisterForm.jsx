import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const RegisterForm = () => {
  const navigate = useNavigate();
  const backendUrl = useContext(AppContext);
  const [formData, setFormData] = useState({
    fullname: "",
    parent: "",
    email: "",
    mobile: "",
    identity: "adhar",
    idnumber: "",
    category: "takeaway",
    streetname: "",
    district: "",
    state: "",
    country: "",
    pin: "",
    amount: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const donationRazorpay = async (formData) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/user/payment-razorpay",
        formData
      );

      if (data.success) {
        const { amount, id: order_id, currency } = data.order;

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: amount.toString(),
          currency: currency,
          name: "Donation Portal",
          description: "Transaction",
          order_id: order_id,
          handler: async function (response) {
            // Call verify API
            console.log(response);
            const verifyRes = await axios.post(
              "http://localhost:4000/api/user/verifyRazorpay",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
              }
            );

            if (verifyRes.data.success) {
              console.log("Payment successful");
              navigate("/");
            } else {
              console.log("Payment verification failed");
            }
          },
          prefill: {
            name: formData.fullname,
            email: formData.email,
            contact: formData.mobile,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    donationRazorpay(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="m-5 w-full max-w-4xl">
        {/* Heading */}
        <div className="text-center text-2xl pt-10 text-gray-500">
          <p>
            DONATION <span className="text-gray-700 font-medium">FORM</span>
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white px-8 py-8 mt-5 border rounded shadow-md max-h-[80vh] overflow-y-scroll">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p>Full Name</p>
                <input
                  type="text"
                  name="fullname"
                  onChange={handleChange}
                  className="border rounded px-3 py-2"
                  placeholder="Enter your Name"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <p>S/o/W/o/D/o Name</p>
                <input
                  type="text"
                  name="parent"
                  onChange={handleChange}
                  className="border rounded px-3 py-2"
                  placeholder="S/o/W/o/D/o Name"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <p>Email Address</p>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="border rounded px-3 py-2"
                  placeholder="Email Address"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <p>Mobile</p>
                <input
                  type="number"
                  name="mobile"
                  onChange={handleChange}
                  className="border rounded px-3 py-2"
                  placeholder="Mobile Number"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <p>Adhar/Pan</p>
                <div className="flex gap-2">
                  <select
                    name="identity"
                    onChange={handleChange}
                    className="border rounded px-2"
                  >
                    <option value="adhar">Adhar</option>
                    <option value="pan">Pan</option>
                  </select>
                  <input
                    type="text"
                    name="idnumber"
                    onChange={handleChange}
                    className="border rounded px-3 py-2 w-full"
                    placeholder="Your ID number"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <p>Category</p>
                <select
                  name="category"
                  onChange={handleChange}
                  className="border rounded px-3 py-2"
                  required
                >
                  <option value="takeaway">Takeaway</option>
                  <option value="delivery">Delivery</option>
                </select>
              </div>
            </div>

            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p>House Number/Street Name</p>
                <input
                  type="text"
                  name="streetname"
                  onChange={handleChange}
                  className="border rounded px-3 py-2"
                  placeholder="Street Name"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <p>District</p>
                <input
                  type="text"
                  name="district"
                  onChange={handleChange}
                  className="border rounded px-3 py-2"
                  placeholder="District"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <p>State</p>
                <input
                  type="text"
                  name="state"
                  onChange={handleChange}
                  className="border rounded px-3 py-2"
                  placeholder="State"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <p>Country</p>
                <input
                  type="text"
                  name="country"
                  onChange={handleChange}
                  className="border rounded px-3 py-2"
                  placeholder="Country"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <p>Pin/Zip Code</p>
                <input
                  type="number"
                  name="pin"
                  onChange={handleChange}
                  className="border rounded px-3 py-2"
                  placeholder="Pin/Zip Code"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <p>Enter Amount</p>
                <div className="flex gap-2">
                  <select
                    name="currency"
                    className="border rounded px-3 py-2"
                    required
                  >
                    <option value="rupees">Rs. </option>
                  </select>
                  <input
                    type="number"
                    name="amount"
                    onChange={handleChange}
                    className="border rounded px-3 py-2 w-full"
                    placeholder="Enter Amount"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center items-center">
          <button
            type="submit"
            className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
          >
            PAY NOW
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
