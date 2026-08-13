import User from "../models/User.js";

import HTTP_STATUS from "../constants/httpStatus.js";

/* =====================================================
                    GET PROFILE
===================================================== */

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,

        message: "User not found.",
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,

      data: user,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,

      message: error.message,
    });
  }
};

/* =====================================================
                    UPDATE PROFILE
===================================================== */

export const updateProfile = async (req, res) => {
  try {
    const {
      name,

      bio,

      location,

      website,

      role,

      skills,

      socialLinks,

      avatar,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,

        message: "User not found.",
      });
    }

    /* -----------------------------
                BASIC PROFILE
        ----------------------------- */

    if (name !== undefined) {
      user.name = name;
    }

    if (bio !== undefined) {
      user.bio = bio;
    }

    if (location !== undefined) {
      user.location = location;
    }

    if (website !== undefined) {
      user.website = website;
    }

    if (role !== undefined) {
      user.role = role;
    }

    if (avatar !== undefined) {
      user.avatar = avatar;
    }

    /* -----------------------------
                    SKILLS
        ----------------------------- */

    if (skills !== undefined) {
      user.skills = skills;
    }

    /* -----------------------------
                SOCIAL LINKS
        ----------------------------- */

    if (socialLinks !== undefined) {
      user.socialLinks = {
        ...user.socialLinks,

        ...socialLinks,
      };
    }

    const updatedUser = await user.save();

    const profile = await User.findById(updatedUser._id).select("-password");

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Profile updated successfully.",
      data: profile,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,

      message: error.message,
    });
  }
};
