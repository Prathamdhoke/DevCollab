import Task from "../models/Task.js";

import Project from "../models/Project.js";

import HTTP_STATUS from "../constants/httpStatus.js";

/* =====================================================
                    CREATE TASK
===================================================== */

export const createTask = async (req, res) => {
  try {
    const { projectId } = req.params;

    const { title, description, assignedTo, deadline } = req.body;

    if (!title || !assignedTo || !deadline) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,

        message: "Title, assigned member and deadline are required.",
      });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,

        message: "Project not found.",
      });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,

        message: "Only the project owner can create and assign tasks.",
      });
    }

    const isMember = project.members.some(
      (memberId) => memberId.toString() === assignedTo.toString(),
    );

    if (!isMember) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,

        message: "The assigned user is not a member of this project.",
      });
    }

    const deadlineDate = new Date(deadline);

    if (Number.isNaN(deadlineDate.getTime())) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,

        message: "Invalid deadline.",
      });
    }

    const task = await Task.create({
      title,

      description,

      project: project._id,

      assignedTo,

      createdBy: req.user._id,

      deadline: deadlineDate,

      status: "todo",
    });

    await task.populate("assignedTo", "name username");

    await task.populate("createdBy", "name username");

    res.status(HTTP_STATUS.CREATED).json({
      success: true,

      message: "Task created successfully.",

      data: task,
    });
  } catch (error) {
    console.log("Create Task Error:", error);

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,

      message: error.message,
    });
  }
};

/* =====================================================
                GET PROJECT TASKS
===================================================== */

export const getProjectTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,

        message: "Project not found.",
      });
    }

    const isMember = project.members.some(
      (memberId) => memberId.toString() === req.user._id.toString(),
    );

    if (!isMember) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,

        message: "You are not a member of this project.",
      });
    }

    const tasks = await Task.find({
      project: projectId,
    })

      .populate("assignedTo", "name username")

      .populate("createdBy", "name username")

      .sort({
        deadline: 1,
      });

    res.status(HTTP_STATUS.OK).json({
      success: true,

      data: tasks,
    });
  } catch (error) {
    console.log("Get Project Tasks Error:", error);

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,

      message: error.message,
    });
  }
};

/* =====================================================
                UPDATE TASK STATUS
===================================================== */

export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;

    const { status } = req.body;

    const allowedStatuses = ["todo", "in-progress", "review", "completed"];

    if (!allowedStatuses.includes(status)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,

        message: "Invalid task status.",
      });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,

        message: "Task not found.",
      });
    }

    const project = await Project.findById(task.project);

    if (!project) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,

        message: "Project not found.",
      });
    }

    const isMember = project.members.some(
      (memberId) => memberId.toString() === req.user._id.toString(),
    );

    if (!isMember) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,

        message: "You are not a member of this project.",
      });
    }

    if (task.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,

        message: "You can only update tasks assigned to you.",
      });
    }

    task.status = status;

    if (status === "completed") {
      task.completedAt = new Date();
    } else {
      task.completedAt = null;
    }

    await task.save();

    await task.populate("assignedTo", "name username");

    await task.populate("createdBy", "name username");

    await task.populate("project", "name");

    res.status(HTTP_STATUS.OK).json({
      success: true,

      message: "Task status updated successfully.",

      data: task,
    });
  } catch (error) {
    console.log("Update Task Status Error:", error);

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,

      message: error.message,
    });
  }
};

/* =====================================================
                    DELETE TASK
===================================================== */

export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,

        message: "Task not found.",
      });
    }

    const project = await Project.findById(task.project);

    if (!project) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,

        message: "Project not found.",
      });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,

        message: "Only the project owner can delete tasks.",
      });
    }

    await Task.findByIdAndDelete(taskId);

    res.status(HTTP_STATUS.OK).json({
      success: true,

      message: "Task deleted successfully.",
    });
  } catch (error) {
    console.log("Delete Task Error:", error);

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,

      message: error.message,
    });
  }
};

/* =====================================================
                    GET MY TASKS
===================================================== */

export const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      assignedTo: req.user._id,
    })

      .populate("project", "name")

      .populate("createdBy", "name username")

      .sort({
        deadline: 1,
      });

    res.status(HTTP_STATUS.OK).json({
      success: true,

      data: tasks,
    });
  } catch (error) {
    console.log("Get My Tasks Error:", error);

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,

      message: error.message,
    });
  }
};
