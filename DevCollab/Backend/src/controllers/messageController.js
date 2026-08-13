import Message from "../models/Message.js";

import Conversation from "../models/Conversation.js";

import HTTP_STATUS from "../constants/httpStatus.js";

/* =====================================================
                GET CONVERSATION MESSAGES
===================================================== */

export const getConversationMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    /* ==========================
            FIND CONVERSATION
    ========================== */

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,

        message: "Conversation not found.",
      });
    }

    /* ==========================
            MEMBER CHECK
    ========================== */

    const isParticipant = conversation.participants.some(
      (userId) => userId.toString() === req.user._id.toString(),
    );

    if (!isParticipant) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,

        message: "You are not part of this conversation.",
      });
    }

    /* ==========================
                GET MESSAGES
    ========================== */

    const messages = await Message.find({
      conversation: conversationId,
    })
      .populate("sender", "name username avatar")
      .populate("receiver", "name username avatar")
      .sort({
        createdAt: 1,
      });

    res.status(HTTP_STATUS.OK).json({
      success: true,

      data: messages,
    });
  } catch (error) {
    console.log("Get Conversation Messages Error:", error);

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,

      message: error.message,
    });
  }
};

/* =====================================================
                    SEND MESSAGE
===================================================== */

export const sendMessage = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const { text } = req.body;

    /* ==========================
                VALIDATION
    ========================== */

    if (!text || !text.trim()) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,

        message: "Message cannot be empty.",
      });
    }

    /* ==========================
            FIND CONVERSATION
    ========================== */

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,

        message: "Conversation not found.",
      });
    }

    /* ==========================
            MEMBER CHECK
    ========================== */

    const isParticipant = conversation.participants.some(
      (userId) => userId.toString() === req.user._id.toString(),
    );

    if (!isParticipant) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,

        message: "You are not part of this conversation.",
      });
    }

    /* ==========================
            FIND RECEIVER
    ========================== */

    const receiverId = conversation.participants.find(
      (userId) => userId.toString() !== req.user._id.toString(),
    );

    if (!receiverId) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,

        message: "Receiver not found.",
      });
    }

    /* ==========================
                CREATE MESSAGE
    ========================== */

    const message = await Message.create({
      conversation: conversationId,

      sender: req.user._id,

      receiver: receiverId,

      text: text.trim(),
    });

    /* ==========================
      UPDATE CONVERSATION
========================== */

    conversation.lastMessage = text.trim();

    conversation.updatedAt = new Date();

    await conversation.save();

    /* ==========================
                POPULATE
    ========================== */

    await message.populate("sender", "name username avatar");

    await message.populate("receiver", "name username avatar");

    /* ==========================
                RESPONSE
    ========================== */

    res.status(HTTP_STATUS.CREATED).json({
      success: true,

      message: "Message sent successfully.",

      data: message,
    });
  } catch (error) {
    console.log("Send Message Error:", error);

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,

      message: error.message,
    });
  }
};
