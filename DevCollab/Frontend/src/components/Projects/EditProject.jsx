import { useEffect, useState } from "react";

import api from "../../api/axios.js";

import "./EditProject.css";

function EditProject({ project, onClose, onUpdated }) {
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
                    LOAD PROJECT DATA
    ===================================================== */

  useEffect(() => {
    if (!project) {
      return;
    }

    setFormData({
      name: project.name || "",

      description: project.description || "",

      status: project.status || "planning",

      visibility: project.visibility || "private",

      technologies: project.technologies ? project.technologies.join(", ") : "",
    });
  }, [project]);

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
                    UPDATE PROJECT
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

      const response = await api.put(
        `/projects/${project._id}`,

        {
          name: formData.name,

          description: formData.description,

          status: formData.status,

          visibility: formData.visibility,

          technologies,
        },
      );

      if (response.data.success) {
        onUpdated(response.data.data);

        onClose();
      }
    } catch (error) {
      console.log("Update Project Error:", error);

      setError(error.response?.data?.message || "Failed to update project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-project-overlay">
      <div className="edit-project-modal">
        {/* ===========================
                            HEADER
                =========================== */}

        <div className="edit-project-header">
          <div>
            <h2>Edit Project</h2>

            <p>Update your project details.</p>
          </div>

          <button
            type="button"
            className="close-edit-project-btn"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* ===========================
                            ERROR
                =========================== */}

        {error && <div className="edit-project-error">{error}</div>}

        {/* ===========================
                            FORM
                =========================== */}

        <form className="edit-project-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Project Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter project name"
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your project"
              rows="4"
            />
          </div>

          <div className="edit-project-row">
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
              value={formData.technologies}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
            />

            <span className="form-hint">
              Separate technologies with commas.
            </span>
          </div>

          {/* ===========================
                            ACTIONS
                    =========================== */}

          <div className="edit-project-actions">
            <button
              type="button"
              className="cancel-edit-project-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-project-btn"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProject;
