import express from "express";
import multer from "multer";
import {
  addForm,
  getEntry,
  paymentRazorpay,
  updateEntry,
  verifyRazorpay,
} from "../controllers/userController.js";

const userRouter = express.Router();
const upload = multer();

userRouter.post("/add-form", upload.none(), addForm);
userRouter.get("/get-entry", upload.none(), getEntry);
userRouter.post("/update-entry", upload.none(), updateEntry);
userRouter.post("/payment-razorpay", upload.none(), paymentRazorpay);
userRouter.post("/verifyRazorpay", upload.none(), verifyRazorpay);

export default userRouter;
