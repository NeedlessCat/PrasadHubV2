import express from "express";
import jwt from "jsonwebtoken";
import formModel from "../models/formModel.js";

//API for admin login..
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get all entries for admin panel..
const allEntries = async (req, res) => {
  try {
    const entries = await formModel.find({ payment: true });
    res.json({ success: true, entries });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get dashboard data...
const adminDashboard = async (req, res) => {
  try {
    const entries = await formModel.find({ payment: true });
    const delivery = await formModel.find({
      payment: true,
      category: "delivery",
    });
    const takeaway = await formModel.find({
      payment: true,
      category: "takeaway",
    });

    const dashData = {
      entries: entries.length,
      delivery: delivery.length,
      takeaway: takeaway.length,
      latestAppointments: entries.reverse().slice(0, 5),
    };
    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { loginAdmin, allEntries, adminDashboard };
