import express from "express";

import {
  getConversationMessages,
  sendMessage,
} from "../controllers/messageController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* =====================================================
        GET CONVERSATION MESSAGES
===================================================== */

router.get("/messages/:conversationId", protect, getConversationMessages);

/* =====================================================
        SEND MESSAGE
===================================================== */

router.post("/messages/:conversationId", protect, sendMessage);

export default router;
