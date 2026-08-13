import { useEffect, useState } from "react";

import { useOutletContext } from "react-router-dom";

import api from "../api/axios.js";

import ProjectGrid from "../components/Projects/ProjectGrid";

function Projects() {
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const { projectCreated, setProjectCreated } = useOutletContext();

  /* =====================================================
                    GET PROJECTS
    ===================================================== */

  const getProjects = async () => {
    try {
      setLoading(true);

      setError("");

      const response = await api.get("/projects");

      setProjects(response.data.data);
    } catch (error) {
      console.log("Projects Error:", error);

      setError(error.response?.data?.message || "Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
                    LOAD PROJECTS
    ===================================================== */

  useEffect(() => {
    getProjects();
  }, []);

  /* =====================================================
                    ADD NEW PROJECT
    ===================================================== */

  useEffect(() => {
    if (!projectCreated) {
      return;
    }

    setProjects((prevProjects) => [projectCreated, ...prevProjects]);

    setProjectCreated(null);
  }, [projectCreated, setProjectCreated]);

  return (
    <div className="projects-page">
      {/* ===========================
                    LOADING
            =========================== */}

      {loading && <div className="projects-loading">Loading projects...</div>}

      {/* ===========================
                    ERROR
            =========================== */}

      {!loading && error && <div className="projects-error">{error}</div>}

      {/* ===========================
                    PROJECT GRID
            =========================== */}

      {!loading && !error && <ProjectGrid projects={projects} />}
    </div>
  );
}

export default Projects;
