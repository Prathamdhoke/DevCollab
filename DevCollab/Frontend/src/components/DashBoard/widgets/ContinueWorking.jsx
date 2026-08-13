import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import "./ContinueWorking.css";

import api from "../../../api/axios.js";

function ContinueWorking() {
  const navigate = useNavigate();

  const [task, setTask] = useState(null);

  const [loading, setLoading] = useState(true);

  /* =====================================================
              GET LATEST COMPLETED TASK
  ===================================================== */

  const getLatestCompletedTask = async () => {
    try {
      setLoading(true);

      const response = await api.get("/tasks/my");

      if (response.data.success) {
        const completedTasks = response.data.data.filter(
          (task) => task.status === "completed" && task.completedAt,
        );

        completedTasks.sort(
          (a, b) => new Date(b.completedAt) - new Date(a.completedAt),
        );

        setTask(completedTasks[0] || null);
      }
    } catch (error) {
      console.log("Continue Working Error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
                      LOAD TASK
  ===================================================== */

  useEffect(() => {
    getLatestCompletedTask();
  }, []);

  /* =====================================================
                      LOADING
  ===================================================== */

  if (loading) {
    return (
      <section className="dashboard-widget continue-working">
        <div className="continue-header">
          <span className="continue-badge">Recently Completed</span>

          <h2>Continue Working</h2>

          <p>Loading your latest completed task...</p>
        </div>
      </section>
    );
  }

  /* =====================================================
                NO COMPLETED TASK
  ===================================================== */

  if (!task) {
    return (
      <section className="dashboard-widget continue-working">
        <div className="continue-header">
          <span className="continue-badge">Recently Completed</span>

          <h2>Continue Working</h2>

          <p>No completed tasks yet.</p>
        </div>
      </section>
    );
  }

  /* =====================================================
                    OPEN PROJECT
  ===================================================== */

  const openProject = () => {
    if (!task.project?._id) {
      return;
    }

    navigate(`/projects/${task.project._id}`);
  };

  /* =====================================================
                      DISPLAY
  ===================================================== */

  return (
    <section className="dashboard-widget continue-working">
      <div className="continue-header">
        <span className="continue-badge">Recently Completed</span>

        <h2>Continue Working</h2>

        <p>Your latest completed task.</p>
      </div>

      <div className="project-card">
        <div className="project-info">
          <h3>{task.project?.name || "Project"}</h3>

          <p>✓ {task.title}</p>
        </div>

        <button className="continue-btn" type="button" onClick={openProject}>
          Open Project →
        </button>
      </div>
    </section>
  );
}

export default ContinueWorking;
