import express from "express";
const router = express.Router();
import { loginAdmin } from "../controllers/adminController.js";

router.route("/admin").post(loginAdmin);

export default router;
