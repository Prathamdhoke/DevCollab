import "./ProjectsHeader.css";

function ProjectsHeader({ onCreateProject }) {
  return (
    <header className="projects-header">
      <div>
        <h1>Projects</h1>

        <p>Manage and organize all your active projects.</p>
      </div>

      <button className="create-project-btn" onClick={onCreateProject}>
        + Create Project
      </button>
    </header>
  );
}

export default ProjectsHeader;
