import Project from "../models/Project.js";

import User from "../models/User.js";

import HTTP_STATUS from "../constants/httpStatus.js";

/* =====================================================
                    ADD PROJECT MEMBER
===================================================== */

export const addProjectMember = async (req, res) => {
  try {
    const { username } = req.body;

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

    const project = await Project.findById(req.params.projectId);

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

        message: "Only the project owner can add members.",
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
                CHECK ALREADY MEMBER
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
                ADD TO PROJECT
        ----------------------------- */

    project.members.push(user._id);

    await project.save();

    /* -----------------------------
                ADD TO USER
        ----------------------------- */

    await User.findByIdAndUpdate(
      user._id,

      {
        $addToSet: {
          joinedProjects: project._id,
        },
      },
    );

    /* -----------------------------
                GET UPDATED PROJECT
        ----------------------------- */

    const updatedProject = await Project.findById(project._id)

      .populate("owner", "name username avatar")

      .populate("members", "name username avatar");

    /* -----------------------------
                    RESPONSE
        ----------------------------- */

    res.status(HTTP_STATUS.OK).json({
      success: true,

      message: "Member added successfully.",

      data: updatedProject,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,

      message: error.message,
    });
  }
};

/* =====================================================
                REMOVE PROJECT MEMBER
===================================================== */

export const removeProjectMember = async (req, res) => {
  try {
    const { userId } = req.params;

    /* -----------------------------
                FIND PROJECT
        ----------------------------- */

    const project = await Project.findById(req.params.projectId);

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

        message: "Only the project owner can remove members.",
      });
    }

    /* -----------------------------
                PREVENT OWNER REMOVAL
        ----------------------------- */

    if (project.owner.toString() === userId) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,

        message: "Project owner cannot be removed.",
      });
    }

    /* -----------------------------
                CHECK MEMBERSHIP
        ----------------------------- */

    const isMember = project.members.some(
      (memberId) => memberId.toString() === userId.toString(),
    );

    if (!isMember) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,

        message: "User is not a member of this project.",
      });
    }

    /* -----------------------------
                REMOVE FROM PROJECT
        ----------------------------- */

    project.members = project.members.filter(
      (memberId) => memberId.toString() !== userId.toString(),
    );

    await project.save();

    /* -----------------------------
                REMOVE FROM USER
        ----------------------------- */

    await User.findByIdAndUpdate(
      userId,

      {
        $pull: {
          joinedProjects: project._id,
        },
      },
    );

    /* -----------------------------
                GET UPDATED PROJECT
        ----------------------------- */

    const updatedProject = await Project.findById(project._id)

      .populate("owner", "name username avatar")

      .populate("members", "name username avatar");

    /* -----------------------------
                    RESPONSE
        ----------------------------- */

    res.status(HTTP_STATUS.OK).json({
      success: true,

      message: "Member removed successfully.",

      data: updatedProject,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,

      message: error.message,
    });
  }
};
