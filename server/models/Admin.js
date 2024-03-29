import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    minlength: 3,
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Please provide a valid email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
    trim: true,
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },

  isAdmin:{
    type:Boolean,
    default:true,
  }
});

AdminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


AdminSchema.methods.createJWT= function(){
    return jwt.sign({userId:this._id,role:this.isAdmin},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}
// AdminSchema.methods.comparePassword = async function (candidatePassword) {
//   const isMatch = await bcrypt.compare(candidatePassword, this.password)
//   return isMatch
// }
AdminSchema.methods.comparePassword = async function(candidatePassword){
  const isMatch = await bcrypt.compare(candidatePassword,this.password)
  return isMatch
}


export default mongoose.model("Admin", AdminSchema);
