import express from "express";
const router = express.Router();

import { getAllProducts,SingleProductInfo} from "../controllers/productsController.js";

router.route("/allproducts").get(getAllProducts);
router.route("/singleProductInfo").post(SingleProductInfo);

export default router;
