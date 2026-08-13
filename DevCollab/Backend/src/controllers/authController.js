import User from "../models/User.js";

import sendTokenResponse from "../utils/sendTokenResponse.js";

import cookieOptions from "../config/cookieOptions.js";

import HTTP_STATUS from "../constants/httpStatus.js";

/* =====================================================
                    REGISTER USER
===================================================== */

export const registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    /* -----------------------------
                VALIDATION
        ----------------------------- */

    if (!name || !username || !email || !password) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "All fields are required.",
      });
    }

    /* -----------------------------
            CHECK EMAIL EXISTS
        ----------------------------- */

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        success: false,
        message: "Email already registered.",
      });
    }

    /* -----------------------------
          CHECK USERNAME EXISTS
        ----------------------------- */

    const usernameExists = await User.findOne({ username });

    if (usernameExists) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        success: false,
        message: "Username already taken.",
      });
    }

    /* -----------------------------
                CREATE USER
        ----------------------------- */

    const user = await User.create({
      name,
      username,
      email,
      password,
    });

    /* -----------------------------
                SEND RESPONSE
        ----------------------------- */

    sendTokenResponse(
      user,
      HTTP_STATUS.CREATED,
      "User registered successfully.",
      res,
    );
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
                    LOGIN USER
===================================================== */

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    /* -----------------------------
                VALIDATION
        ----------------------------- */

    if (!email || !password) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    /* -----------------------------
                FIND USER
        ----------------------------- */

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    /* -----------------------------
            CHECK PASSWORD
        ----------------------------- */

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    /* -----------------------------
                SEND RESPONSE
        ----------------------------- */

    sendTokenResponse(user, HTTP_STATUS.OK, "Login successful.", res);
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
                    LOGOUT USER
===================================================== */

export const logoutUser = async (req, res) => {
  try {
    res.cookie(
      "token",

      "",

      {
        ...cookieOptions,
        expires: new Date(0),
      },
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
                CURRENT USER
===================================================== */

export const getCurrentUser = async (req, res) => {
  try {
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};
