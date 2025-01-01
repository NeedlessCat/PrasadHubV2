import express from "express";
import {
  adminDashboard,
  allEntries,
  loginAdmin,
} from "../controllers/adminController.js";
import authAdmin from "../middlewares/authAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post("/entries", authAdmin, allEntries);
adminRouter.get("/dashboard", authAdmin, adminDashboard);

export default adminRouter;
