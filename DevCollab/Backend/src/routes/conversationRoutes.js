import express from "express";

import {
  getMyConversations,
  getProjectContacts,
  searchUser,
  createConversation,
} from "../controllers/conversationController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* =====================================================
                GET MY CONVERSATIONS
===================================================== */

router.get("/conversations", protect, getMyConversations);

/* =====================================================
                GET PROJECT CONTACTS
===================================================== */

router.get("/conversations/contacts", protect, getProjectContacts);

/* =====================================================
                SEARCH USER
===================================================== */

router.get("/conversations/search", protect, searchUser);

/* =====================================================
                CREATE CONVERSATION
===================================================== */

router.post("/conversations", protect, createConversation);

export default router;
