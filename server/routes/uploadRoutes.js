import express from "express";
const router = express.Router();

import { uploadproduct} from "../controllers/uploadController.js";


router.route("/uploadproduct").post(uploadproduct);







export default router;
