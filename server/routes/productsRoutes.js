import express from "express";
const router = express.Router();

import { getAllProducts,SingleProductInfo,searchSong} from "../controllers/productsController.js";

router.route("/allproducts").get(getAllProducts);
router.route("/singleProductInfo").post(SingleProductInfo);
router.route("/searchProduct").post(searchSong);

export default router;
