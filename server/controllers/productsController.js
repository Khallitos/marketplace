import Upload from "../models/Upload.js";
import User from "../models/User.js";
import Admin from "../models/Admin.js";
import BadRequestError from "../errors/bad-request.js";
import { nanoid } from "nanoid";
import mongoose from "mongoose";
import uploadFile from "../utils/s3.js";
import musicFile from "../utils/musicFile.js";
import { request } from "express";
import { formvalidationSchema } from "../validations/formvalidationSchema.js";


const getAllProducts = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const allProducts = await Upload.find({ Verified: true })
      .skip(skip)
      .limit(limit);
    const totalData = await Upload.find();
    const numOfPages = Math.ceil(totalData.length / limit);
  
    res.status(200).json({ allProducts, numOfPages, totalProducts: allProducts.length });
  };

  const SingleProductInfo = async (req, res) => {
    
    const { id } = req.body;   
    const data = await Upload.findOne({ _id: id });
    res.status(200).json({ data });
  };

  const searchSong = async (req, res) => {
    const product  = req.query.product;
    const limit = 10;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;
  
    const ProductTitle = new RegExp(product, "i");
    const SearchedProduct = await Upload.find({
      $or: [{ Description: ProductTitle }, { Title: ProductTitle }],
      Verified: true,
    })
      .skip(skip)
      .limit(limit);
  
    const SearchedProductCount = await Upload.find({
      $or: [{ Description: ProductTitle }, { Title: ProductTitle }],
    });
    const numOfPages = Math.ceil(SearchedProductCount.length / limit);
    res
      .status(200)
      .json({ SearchedProduct, numOfPages, totalProducts: SearchedProductCount.length });
  };
  
export {
    getAllProducts,
    SingleProductInfo,
    searchSong

};
