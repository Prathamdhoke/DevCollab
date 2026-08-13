import Conversation from "../models/Conversation.js";

import Project from "../models/Project.js";

import User from "../models/User.js";

import HTTP_STATUS from "../constants/httpStatus.js";

/* =====================================================
                GET MY CONVERSATIONS
===================================================== */

export const getMyConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user._id,
    })
      .populate("participants", "name username avatar isOnline lastSeen")
      .sort({
        updatedAt: -1,
      });

    res.status(HTTP_STATUS.OK).json({
      success: true,

      data: conversations,
    });
  } catch (error) {
    console.log("Get Conversations Error:", error);

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,

      message: error.message,
    });
  }
};

/* =====================================================
            GET USERS FROM MY PROJECTS
===================================================== */

export const getProjectContacts = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user._id,
    }).populate("members", "name username email avatar isOnline lastSeen");

    const users = [];

    const userIds = new Set();

    for (const project of projects) {
      for (const member of project.members) {
        if (
          member._id.toString() !== req.user._id.toString() &&
          !userIds.has(member._id.toString())
        ) {
          userIds.add(member._id.toString());

          users.push(member);
        }
      }
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,

      data: users,
    });
  } catch (error) {
    console.log("Get Project Contacts Error:", error);

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,

      message: error.message,
    });
  }
};

/* =====================================================
                SEARCH USER BY USERNAME
===================================================== */

export const searchUser = async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,

        message: "Username is required.",
      });
    }

    const user = await User.findOne({
      username: {
        $regex: `^${username}$`,
        $options: "i",
      },

      _id: {
        $ne: req.user._id,
      },
    }).select("name username avatar isOnline lastSeen bio role");

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
    console.log("Search User Error:", error);

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,

      message: error.message,
    });
  }
};

/* =====================================================
                CREATE CONVERSATION
===================================================== */

export const createConversation = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,

        message: "User ID is required.",
      });
    }

    /* ==========================
            PREVENT SELF CHAT
    ========================== */

    if (userId.toString() === req.user._id.toString()) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,

        message: "You cannot start a conversation with yourself.",
      });
    }

    /* ==========================
                FIND USER
    ========================== */

    const user = await User.findById(userId);

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,

        message: "User not found.",
      });
    }

    /* ==========================
        CHECK EXISTING CONVERSATION
    ========================== */

    let conversation = await Conversation.findOne({
      participants: {
        $all: [req.user._id, userId],
      },

      $expr: {
        $eq: [
          {
            $size: "$participants",
          },
          2,
        ],
      },
    });

    /* ==========================
        CREATE CONVERSATION
    ========================== */

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [req.user._id, userId],
      });

      await User.findByIdAndUpdate(req.user._id, {
        $addToSet: {
          conversations: conversation._id,
        },
      });

      await User.findByIdAndUpdate(userId, {
        $addToSet: {
          conversations: conversation._id,
        },
      });
    }

    /* ==========================
            POPULATE
    ========================== */

    await conversation.populate(
      "participants",
      "name username email avatar isOnline lastSeen",
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,

      message: "Conversation ready.",

      data: conversation,
    });
  } catch (error) {
    console.log("Create Conversation Error:", error);

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,

      message: error.message,
    });
  }
};
