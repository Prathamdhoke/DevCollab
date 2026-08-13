import Project from "../models/Project.js";

import User from "../models/User.js";

import ProjectInvitation from "../models/ProjectInvitation.js";

import HTTP_STATUS from "../constants/httpStatus.js";

/* =====================================================
                SEND PROJECT INVITATION
===================================================== */

export const sendProjectInvitation = async (req, res) => {
  try {
    const { username } = req.body;

    const { projectId } = req.params;

    /* -----------------------------
                VALIDATION
        ----------------------------- */

    if (!username) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,

        message: "Username is required.",
      });
    }

    /* -----------------------------
                FIND PROJECT
        ----------------------------- */

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,

        message: "Project not found.",
      });
    }

    /* -----------------------------
                OWNER CHECK
        ----------------------------- */

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,

        message: "Only the project owner can send invitations.",
      });
    }

    /* -----------------------------
                FIND USER
        ----------------------------- */

    const user = await User.findOne({
      username,
    });

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,

        message: "User not found.",
      });
    }

    /* -----------------------------
                CANNOT INVITE YOURSELF
        ----------------------------- */

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,

        message: "You cannot invite yourself.",
      });
    }

    /* -----------------------------
                CHECK EXISTING MEMBER
        ----------------------------- */

    const alreadyMember = project.members.some(
      (memberId) => memberId.toString() === user._id.toString(),
    );

    if (alreadyMember) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        success: false,

        message: "User is already a project member.",
      });
    }

    /* -----------------------------
                CHECK PENDING INVITATION
        ----------------------------- */

    const existingInvitation = await ProjectInvitation.findOne({
      project: project._id,

      invitedUser: user._id,

      status: "pending",
    });

    if (existingInvitation) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        success: false,

        message: "A pending invitation already exists for this user.",
      });
    }

    /* -----------------------------
                CREATE INVITATION
        ----------------------------- */

    const invitation = await ProjectInvitation.create({
      project: project._id,

      invitedUser: user._id,

      invitedBy: req.user._id,

      status: "pending",
    });

    /* -----------------------------
                RESPONSE
        ----------------------------- */

    res.status(HTTP_STATUS.CREATED).json({
      success: true,

      message: "Project invitation sent successfully.",

      data: invitation,
    });
  } catch (error) {
    console.log("Send Invitation Error:", error);

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,

      message: error.message,
    });
  }
};

/* =====================================================
                GET MY INVITATIONS
===================================================== */

export const getMyInvitations = async (req, res) => {
  try {
    const invitations = await ProjectInvitation.find({
      invitedUser: req.user._id,

      status: "pending",
    })

      .populate("project", "name description visibility")

      .populate("invitedBy", "name username avatar")

      .sort({
        createdAt: -1,
      });

    res.status(HTTP_STATUS.OK).json({
      success: true,

      data: invitations,
    });
  } catch (error) {
    console.log("Get Invitations Error:", error);

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,

      message: error.message,
    });
  }
};

/* =====================================================
                ACCEPT INVITATION
===================================================== */

export const acceptProjectInvitation = async (req, res) => {
  try {
    const { invitationId } = req.params;

    /* -----------------------------
                FIND INVITATION
        ----------------------------- */

    const invitation = await ProjectInvitation.findById(invitationId);

    if (!invitation) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,

        message: "Invitation not found.",
      });
    }

    /* -----------------------------
                USER CHECK
        ----------------------------- */

    if (invitation.invitedUser.toString() !== req.user._id.toString()) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,

        message: "You cannot respond to this invitation.",
      });
    }

    /* -----------------------------
                STATUS CHECK
        ----------------------------- */

    if (invitation.status !== "pending") {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,

        message: "This invitation has already been processed.",
      });
    }

    /* -----------------------------
                FIND PROJECT
        ----------------------------- */

    const project = await Project.findById(invitation.project);

    if (!project) {
      invitation.status = "rejected";

      await invitation.save();

      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,

        message: "Project no longer exists.",
      });
    }

    /* -----------------------------
                ADD MEMBER TO PROJECT
        ----------------------------- */

    const alreadyMember = project.members.some(
      (memberId) => memberId.toString() === req.user._id.toString(),
    );

    if (!alreadyMember) {
      project.members.push(req.user._id);

      await project.save();
    }

    /* -----------------------------
                ADD PROJECT TO USER
        ----------------------------- */

    await User.findByIdAndUpdate(
      req.user._id,

      {
        $addToSet: {
          joinedProjects: project._id,
        },
      },
    );

    /* -----------------------------
                UPDATE INVITATION
        ----------------------------- */

    invitation.status = "accepted";

    await invitation.save();

    /* -----------------------------
                    RESPONSE
        ----------------------------- */

    res.status(HTTP_STATUS.OK).json({
      success: true,

      message: "Project invitation accepted successfully.",

      data: invitation,
    });
  } catch (error) {
    console.log("Accept Invitation Error:", error);

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,

      message: error.message,
    });
  }
};

/* =====================================================
                REJECT INVITATION
===================================================== */

export const rejectProjectInvitation = async (req, res) => {
  try {
    const { invitationId } = req.params;

    /* -----------------------------
                FIND INVITATION
        ----------------------------- */

    const invitation = await ProjectInvitation.findById(invitationId);

    if (!invitation) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,

        message: "Invitation not found.",
      });
    }

    /* -----------------------------
                USER CHECK
        ----------------------------- */

    if (invitation.invitedUser.toString() !== req.user._id.toString()) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,

        message: "You cannot respond to this invitation.",
      });
    }

    /* -----------------------------
                STATUS CHECK
        ----------------------------- */

    if (invitation.status !== "pending") {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,

        message: "This invitation has already been processed.",
      });
    }

    /* -----------------------------
                UPDATE STATUS
        ----------------------------- */

    invitation.status = "rejected";

    await invitation.save();

    /* -----------------------------
                    RESPONSE
        ----------------------------- */

    res.status(HTTP_STATUS.OK).json({
      success: true,

      message: "Project invitation rejected.",

      data: invitation,
    });
  } catch (error) {
    console.log("Reject Invitation Error:", error);

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,

      message: error.message,
    });
  }
};
