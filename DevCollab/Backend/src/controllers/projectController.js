import Project from "../models/Project.js";

import User from "../models/User.js";

import HTTP_STATUS from "../constants/httpStatus.js";

/* =====================================================
                    CREATE PROJECT
===================================================== */

export const createProject = async (req, res) => {
  try {
    const { name, description, status, visibility, technologies } = req.body;

    /* -----------------------------
                    VALIDATION
        ----------------------------- */

    if (!name) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,

        message: "Project name is required.",
      });
    }

    /* -----------------------------
                CREATE PROJECT
        ----------------------------- */

    const project = await Project.create({
      name,

      description,

      owner: req.user._id,

      members: [req.user._id],

      status,

      visibility,

      technologies,
    });

    /* -----------------------------
            ADD PROJECT TO USER
        ----------------------------- */

    await User.findByIdAndUpdate(
      req.user._id,

      {
        $addToSet: {
          ownedProjects: project._id,
          joinedProjects: project._id,
        },
      },
    );

    /* -----------------------------
                RESPONSE
        ----------------------------- */

    const populatedProject = await Project.findById(project._id)

      .populate("owner", "name username avatar")

      .populate("members", "name username avatar");

    res.status(HTTP_STATUS.CREATED).json({
      success: true,

      message: "Project created successfully.",

      data: populatedProject,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,

      message: error.message,
    });
  }
};

/* =====================================================
                    GET MY PROJECTS
===================================================== */

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user._id,
    })

      .populate("owner", "name username avatar")

      .populate("members", "name username avatar")

      .sort({
        createdAt: -1,
      });

    res.status(HTTP_STATUS.OK).json({
      success: true,

      count: projects.length,

      data: projects,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,

      message: error.message,
    });
  }
};

/* =====================================================
                    GET SINGLE PROJECT
===================================================== */

export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId)

      .populate("owner", "name username avatar")

      .populate("members", "name username avatar");

    if (!project) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,

        message: "Project not found.",
      });
    }

    /* -----------------------------
            CHECK MEMBERSHIP
        ----------------------------- */

    const isMember = project.members.some(
      (member) => member._id.toString() === req.user._id.toString(),
    );

    if (!isMember) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,

        message: "You are not a member of this project.",
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,

      data: project,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,

      message: error.message,
    });
  }
};

/* =====================================================
                    UPDATE PROJECT
===================================================== */

export const updateProject = async (req, res) => {
  try {
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

        message: "Only the project owner can update the project.",
      });
    }

    const { name, description, status, visibility, technologies } = req.body;

    /* -----------------------------
                    UPDATE
        ----------------------------- */

    if (name !== undefined) {
      project.name = name;
    }

    if (description !== undefined) {
      project.description = description;
    }

    if (status !== undefined) {
      project.status = status;
    }

    if (visibility !== undefined) {
      project.visibility = visibility;
    }

    if (technologies !== undefined) {
      project.technologies = technologies;
    }

    const updatedProject = await project.save();

    const populatedProject = await Project.findById(updatedProject._id)

      .populate("owner", "name username avatar")

      .populate("members", "name username avatar");

    res.status(HTTP_STATUS.OK).json({
      success: true,

      message: "Project updated successfully.",

      data: populatedProject,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,

      message: error.message,
    });
  }
};

/* =====================================================
                    DELETE PROJECT
===================================================== */

export const deleteProject = async (req, res) => {
  try {
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

        message: "Only the project owner can delete the project.",
      });
    }

    /* -----------------------------
            REMOVE PROJECT FROM USERS
        ----------------------------- */

    await User.updateMany(
      {
        $or: [
          {
            ownedProjects: project._id,
          },
          {
            joinedProjects: project._id,
          },
        ],
      },

      {
        $pull: {
          ownedProjects: project._id,
          joinedProjects: project._id,
        },
      },
    );

    /* -----------------------------
                DELETE PROJECT
        ----------------------------- */

    await project.deleteOne();

    res.status(HTTP_STATUS.OK).json({
      success: true,

      message: "Project deleted successfully.",
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,

      message: error.message,
    });
  }
};
