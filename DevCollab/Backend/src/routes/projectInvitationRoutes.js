import express from "express";

import {
  sendProjectInvitation,
  getMyInvitations,
  acceptProjectInvitation,
  rejectProjectInvitation,
} from "../controllers/projectInvitationController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* =====================================================
                SEND PROJECT INVITATION
===================================================== */

router.post("/projects/:projectId/invitations", protect, sendProjectInvitation);

/* =====================================================
                GET MY INVITATIONS
===================================================== */

router.get("/invitations", protect, getMyInvitations);

/* =====================================================
                ACCEPT INVITATION
===================================================== */

router.patch(
  "/invitations/:invitationId/accept",
  protect,
  acceptProjectInvitation,
);

/* =====================================================
                REJECT INVITATION
===================================================== */

router.patch(
  "/invitations/:invitationId/reject",
  protect,
  rejectProjectInvitation,
);

export default router;
