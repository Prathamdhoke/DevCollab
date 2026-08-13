import express from "express";

import {
  createTask,
  getProjectTasks,
  getMyTasks,
  updateTaskStatus,
  deleteTask,
} from "../controllers/taskController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* =====================================================
                    CREATE TASK
===================================================== */

router.post("/projects/:projectId/tasks", protect, createTask);

/* =====================================================
                    GET PROJECT TASKS
===================================================== */

router.get("/projects/:projectId/tasks", protect, getProjectTasks);

/* =====================================================
                    UPDATE TASK STATUS
===================================================== */

router.patch("/tasks/:taskId/status", protect, updateTaskStatus);

/* =====================================================
                    DELETE TASK
===================================================== */

router.delete("/tasks/:taskId", protect, deleteTask);

/* =====================================================
                    GET MY TASKS
===================================================== */

router.get("/tasks/my", protect, getMyTasks);

export default router;
