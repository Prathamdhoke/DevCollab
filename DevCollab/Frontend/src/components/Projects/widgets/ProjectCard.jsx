import "./ProjectCard.css";

import { ArrowRight, Users, Calendar } from "lucide-react";

import { useNavigate } from "react-router-dom";

function ProjectCard({ project }) {
  const navigate = useNavigate();

  function openProject() {
    navigate(`/projects/${project._id}`);
  }

  const memberCount = project.members?.length || 0;

  const createdDate = project.createdAt
    ? new Date(project.createdAt).toLocaleDateString()
    : "—";

  return (
    <div className="project-card">
      {/* ===========================
                    PROJECT INFORMATION
            =========================== */}

      <div className="project-card-header">
        <div>
          <h3>{project.name}</h3>

          <p>{project.description || "No description provided."}</p>
        </div>

        <span className={`project-status ${project.status?.toLowerCase()}`}>
          {project.status}
        </span>
      </div>

      {/* ===========================
                    PROJECT TECHNOLOGIES
            =========================== */}

      {project.technologies?.length > 0 && (
        <div className="project-technologies">
          {project.technologies.map((technology, index) => (
            <span key={index} className="project-tech">
              {technology}
            </span>
          ))}
        </div>
      )}

      {/* ===========================
                    PROJECT DETAILS
            =========================== */}

      <div className="project-details">
        <div>
          <Users size={18} />

          <span>{memberCount} Members</span>
        </div>

        <div>
          <Calendar size={18} />

          <span>Created {createdDate}</span>
        </div>
      </div>

      {/* ===========================
                    OPEN PROJECT
            =========================== */}

      <button className="open-project-btn" onClick={openProject}>
        Open Project
        <ArrowRight size={18} />
      </button>
    </div>
  );
}

export default ProjectCard;
