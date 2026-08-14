import { useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

// Pages

import Home from "./pages/Home";

import Login from "./pages/Login";

import Signup from "./pages/SignUp";

import NotFound from "./pages/NotFound";

import Dashboard from "./pages/Dashboard";

import Calendar from "./pages/Calendar";

import Messages from "./pages/Messages";

import Profile from "./pages/Profile";

import Projects from "./pages/Projects";

import ProjectWorkspace from "./pages/ProjectWorkspace";

import Teams from "./pages/Teams";

import TeamWorkspace from "./pages/TeamWorkspace";

// Layouts

import DashboardLayout from "./components/Layouts/DashboardLayout";

import CalendarLayout from "./components/Layouts/CalendarLayout";

import MessagesLayout from "./components/Layouts/MessagesLayout";

import ProfileLayout from "./components/Layouts/ProfileLayout";

import ProjectsLayout from "./components/Layouts/ProjectsLayout";

import TeamsLayout from "./components/Layouts/TeamsLayout";

// Authentication

import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Notifications

import Notifications from "./pages/Notifications";

function App() {
  useEffect(() => {
    const root = document.getElementById("root");

    let timer;

    const activateFrame = () => {
      root.classList.add("app-active");

      clearTimeout(timer);

      timer = setTimeout(() => {
        root.classList.remove("app-active");
      }, 1500);
    };

    window.addEventListener("click", activateFrame);

    window.addEventListener("scroll", activateFrame);

    window.addEventListener("keydown", activateFrame);

    return () => {
      window.removeEventListener("click", activateFrame);

      window.removeEventListener("scroll", activateFrame);

      window.removeEventListener("keydown", activateFrame);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* ===========================
                        PUBLIC ROUTES
                =========================== */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        {/* ===========================
                    PROTECTED ROUTES
                =========================== */}

        <Route element={<ProtectedRoute />}>
          {/* Dashboard */}

          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/notifications" element={<Notifications />} />
          </Route>

          {/* Calendar */}

          <Route element={<CalendarLayout />}>
            <Route path="/calendar" element={<Calendar />} />
          </Route>

          {/* Messages */}

          <Route element={<MessagesLayout />}>
            <Route path="/messages" element={<Messages />} />
          </Route>

          {/* Profile */}

          <Route element={<ProfileLayout />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Projects */}

          <Route element={<ProjectsLayout />}>
            <Route path="/projects" element={<Projects />} />

            <Route path="/projects/:projectId" element={<ProjectWorkspace />} />
          </Route>

          {/* Teams */}

          <Route element={<TeamsLayout />}>
            <Route path="/teams" element={<Teams />} />

            <Route path="/teams/:teamId" element={<TeamWorkspace />} />
          </Route>
        </Route>

        {/* ===========================
                        404
                =========================== */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
