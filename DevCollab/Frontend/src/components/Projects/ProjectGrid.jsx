import "./ProjectGrid.css";

import ProjectCard from "./widgets/ProjectCard";

function ProjectGrid({ projects }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="project-grid">
        <p>You don't have any projects yet.</p>
      </div>
    );
  }

  return (
    <div className="project-grid">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
}

export default ProjectGrid;
