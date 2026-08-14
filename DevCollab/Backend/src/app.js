import express from "express";

import cors from "cors";

import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";

import profileRoutes from "./routes/profileRoutes.js";

import projectRoutes from "./routes/projectRoutes.js";

import projectMemberRoutes from "./routes/projectMemberRoutes.js";

import projectInvitationRoutes from "./routes/projectInvitationRoutes.js";

import taskRoutes from "./routes/taskRoutes.js";

import conversationRoutes from "./routes/conversationRoutes.js";

import messageRoutes from "./routes/messageRoutes.js";

const app = express();

/* ===========================================
                CORS CONFIGURATION
=========================================== */

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       const allowedOrigins = [
//         "https://devcollab-phi.vercel.app",
//       ];

//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   }),
// );

app.use(
  cors({
    origin: "https://devcollab-phi.vercel.app",
    credentials: true,
  }),
);

/* ===========================================
                BODY PARSING
=========================================== */

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

/* ===========================================
                COOKIE PARSER
=========================================== */

app.use(cookieParser());

/* ===========================================
                HEALTH CHECK
=========================================== */

app.get(
  "/",

  (req, res) => {
    res.status(200).json({
      success: true,

      message: "DevCollab Backend Running 🚀",
    });
  },
);

/* ===========================================
                API ROUTES
=========================================== */

app.use(
  "/api/auth",

  authRoutes,
);

app.use(
  "/api/profile",

  profileRoutes,
);

app.use(
  "/api/projects",

  projectRoutes,
);

app.use(
  "/api/projects/:projectId/members",

  projectMemberRoutes,
);

app.use(
  "/api",

  projectInvitationRoutes,
);

app.use(
  "/api",

  taskRoutes,
);

app.use(
  "/api",

  conversationRoutes,
);

app.use(
  "/api",

  messageRoutes,
);

export default app;
