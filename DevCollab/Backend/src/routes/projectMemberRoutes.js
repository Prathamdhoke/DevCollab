import express from "express";

import {
  addProjectMember,
  removeProjectMember,
} from "../controllers/projectMemberController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* =====================================================
                ADD PROJECT MEMBER
===================================================== */

router.post("/", protect, addProjectMember);

/* =====================================================
                REMOVE PROJECT MEMBER
===================================================== */

router.delete("/:userId", protect, removeProjectMember);

export default router;
