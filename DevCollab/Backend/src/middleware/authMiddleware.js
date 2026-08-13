import jwt from "jsonwebtoken";

import User from "../models/User.js";

import HTTP_STATUS from "../constants/httpStatus.js";

export const protect = async (req, res, next) => {
  try {
    /* ----------------------------------
                GET TOKEN FROM COOKIE
        ---------------------------------- */

    const token = req.cookies.token;

    if (!token) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized. Please login.",
      });
    }

    /* ----------------------------------
                VERIFY TOKEN
        ---------------------------------- */

    const decoded = jwt.verify(
      token,

      process.env.JWT_SECRET,
    );

    /* ----------------------------------
                FIND USER
        ---------------------------------- */

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "User not found.",
      });
    }

    /* ----------------------------------
                ATTACH USER
        ---------------------------------- */

    req.user = user;

    next();
  } catch (error) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};
