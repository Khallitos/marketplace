import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import Admin from '../models/Admin.js'; // Assuming your Admin model file is located here

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user exists
    const user = await Admin.findById(decoded.userId);
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not found' });
    }

    // Attach user data to the request for further use
    req.user = user;

    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
  }
};

export default verifyToken;