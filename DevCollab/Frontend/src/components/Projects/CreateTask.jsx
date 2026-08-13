import { useState } from "react";

import api from "../../api/axios.js";

import "./CreateTask.css";

function CreateTask({ project, onClose, onCreated }) {
  const [formData, setFormData] = useState({
    title: "",

    description: "",

    assignedTo: "",

    deadline: "",
  });

  const [loading, setLoading] = useState(false);

  /* =========================================
                HANDLE CHANGE
    ========================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,

      [name]: value,
    }));
  };

  /* =========================================
                CREATE TASK
    ========================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.assignedTo || !formData.deadline) {
      alert("Title, assigned member and deadline are required.");

      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        `/projects/${project._id}/tasks`,

        formData,
      );

      if (response.data.success) {
        onCreated(response.data.data);

        onClose();
      }
    } catch (error) {
      console.log("Create Task Error:", error);

      alert(error.response?.data?.message || "Failed to create task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-task-overlay">
      <div className="create-task-modal">
        {/* =========================
                        HEADER
                ========================= */}

        <div className="create-task-header">
          <div>
            <h2>Create Task</h2>

            <p>Assign a task to a project member.</p>
          </div>

          <button type="button" className="create-task-close" onClick={onClose}>
            ×
          </button>
        </div>

        {/* =========================
                        FORM
                ========================= */}

        <form className="create-task-form" onSubmit={handleSubmit}>
          {/* TITLE */}

          <div className="task-form-group">
            <label>Task Title</label>

            <input
              type="text"
              name="title"
              placeholder="e.g. Build login API"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          {/* DESCRIPTION */}

          <div className="task-form-group">
            <label>Description</label>

            <textarea
              name="description"
              placeholder="Describe what needs to be done..."
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          {/* ASSIGN MEMBER */}

          <div className="task-form-group">
            <label>Assign To</label>

            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
            >
              <option value="">Select a team member</option>

              {project.members?.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.name} (@
                  {member.username})
                </option>
              ))}
            </select>
          </div>

          {/* DEADLINE */}

          <div className="task-form-group">
            <label>Deadline</label>

            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
            />
          </div>

          {/* ACTIONS */}

          <div className="create-task-actions">
            <button type="button" className="cancel-task-btn" onClick={onClose}>
              Cancel
            </button>

            <button
              type="submit"
              className="submit-task-btn"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;
