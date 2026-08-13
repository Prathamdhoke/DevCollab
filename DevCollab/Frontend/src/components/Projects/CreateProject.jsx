import { useState } from "react";

import api from "../../api/axios.js";

import "./CreateProject.css";

function CreateProject({ onClose, onCreated }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "planning",
    visibility: "private",
    technologies: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  /* =====================================================
                    HANDLE CHANGE
    ===================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,

      [name]: value,
    }));
  };

  /* =====================================================
                    CREATE PROJECT
    ===================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.name.trim()) {
      setError("Project name is required.");

      return;
    }

    try {
      setLoading(true);

      const technologies = formData.technologies
        .split(",")
        .map((technology) => technology.trim())
        .filter((technology) => technology !== "");

      const response = await api.post("/projects", {
        name: formData.name,
        description: formData.description,
        status: formData.status,
        visibility: formData.visibility,
        technologies,
      });

      if (response.data.success) {
        onCreated(response.data.data);

        onClose();
      }
    } catch (error) {
      console.log("Create Project Error:", error);

      setError(error.response?.data?.message || "Failed to create project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-project-overlay">
      <div className="create-project-modal">
        {/* ===========================
                            HEADER
                =========================== */}

        <div className="create-project-header">
          <div>
            <h2>Create Project</h2>

            <p>Start a new project and collaborate with your team.</p>
          </div>

          <button type="button" className="close-project-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* ===========================
                            ERROR
                =========================== */}

        {error && <div className="create-project-error">{error}</div>}

        {/* ===========================
                            FORM
                =========================== */}

        <form className="create-project-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Project Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter project name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              placeholder="Describe your project"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="create-project-row">
            <div className="form-group">
              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="planning">Planning</option>

                <option value="active">Active</option>

                <option value="completed">Completed</option>

                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="form-group">
              <label>Visibility</label>

              <select
                name="visibility"
                value={formData.visibility}
                onChange={handleChange}
              >
                <option value="private">Private</option>

                <option value="public">Public</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Technologies</label>

            <input
              type="text"
              name="technologies"
              placeholder="React, Node.js, MongoDB"
              value={formData.technologies}
              onChange={handleChange}
            />

            <span className="form-hint">
              Separate technologies with commas.
            </span>
          </div>

          {/* ===========================
                            ACTIONS
                    =========================== */}

          <div className="create-project-actions">
            <button
              type="button"
              className="cancel-project-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-project-btn"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;
