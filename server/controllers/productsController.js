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
    const allProducts = await Upload.find({ verified: true })
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
  
export {
    getAllProducts,
    SingleProductInfo

};
