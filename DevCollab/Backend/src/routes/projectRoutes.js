import express from "express";

import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* =====================================================
                    PROJECT ROUTES
===================================================== */

/* -----------------------------
            CREATE
----------------------------- */

router.post("/", protect, createProject);

/* -----------------------------
            GET ALL
----------------------------- */

router.get("/", protect, getProjects);

/* -----------------------------
            GET ONE
----------------------------- */

router.get("/:projectId", protect, getProject);

/* -----------------------------
            UPDATE
----------------------------- */

router.put("/:projectId", protect, updateProject);

/* -----------------------------
            DELETE
----------------------------- */

router.delete("/:projectId", protect, deleteProject);

export default router;
