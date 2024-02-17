import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UploadSchema = new mongoose.Schema({
  Region: {
    type: String,
    minlength: 3,
  },

  RegionSurberb: {
    type: String,
    minlength: 3,
  },

  Title: {
    type: String,
    minlength: 3,

  },

  ProductType: {
    type: String,
    minlength: 3,

  },

  SubCategory: {
    type: String,
    minlength: 3,

  },

  Brand: {
    type: String,
    
  },

  Description: {
    type: String,
    minlength: 3,
  },


  Price: {
    type: String,
    
  },

  Condition: {
    type: String,
    
  },

  Swappable: {
    type: String,
  },

  Verified: {
    type: Boolean,
    default: true,
  },

  Negotiable: {
    type: String,
    
  },

  Key1: {
    type: String,
  },

  Key2: {
    type: String,
  },

  Key3: {
    type: String,
  }
});

export default mongoose.model("Products", UploadSchema);
