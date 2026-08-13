import { useState } from "react";

import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import ProjectsHeader from "../Projects/ProjectsHeader";
import CreateProject from "../Projects/CreateProject";

import "./ProjectsLayout.css";

function ProjectsLayout() {
  const location = useLocation();

  const isProjectsPage = location.pathname === "/projects";

  const [showCreateProject, setShowCreateProject] = useState(false);

  const [projectCreated, setProjectCreated] = useState(null);

  return (
    <div className="projects-layout">
      <Sidebar />

      <div className="projects-main">
        {isProjectsPage && (
          <ProjectsHeader
            onCreateProject={() => {
              setShowCreateProject(true);
            }}
          />
        )}

        <main className="projects-content">
          <Outlet
            context={{
              projectCreated,
              setProjectCreated,
            }}
          />
        </main>
      </div>

      {/* ===========================
                    CREATE PROJECT MODAL
            =========================== */}

      {showCreateProject && (
        <CreateProject
          onClose={() => {
            setShowCreateProject(false);
          }}
          onCreated={(project) => {
            setProjectCreated(project);
          }}
        />
      )}
    </div>
  );
}

export default ProjectsLayout;
