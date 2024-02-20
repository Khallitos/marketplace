import Admin from "../models/Admin.js";
import BadRequestError from "../errors/bad-request.js";
import sendMail from "../utils/emailSender.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import emailvalidator from "email-validator";
import bcrypt from "bcryptjs";



// login Administrator

const loginAdmin = async (req, res) => {
  const {  email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please Provide all values");
  }

  const user = await Admin.findOne({ email }).select("+password");
  if (!user) {
    throw new BadRequestError("invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new BadRequestError("invalid credentials");
  }
  const token = user.createJWT();
  user.password = undefined;
  const GoldenHive = true;

  res
    .status(StatusCodes.OK)
    .json({
      username: user.username,
      token,
      isTest:GoldenHive,
      email: user.email,
      verified: user.verified,
    });
};


export {
  loginAdmin,
};
