import { useEffect, useState } from "react";

import "./WorkspaceOverview.css";

import api from "../../../api/axios.js";

function WorkspaceOverview() {
  const [projectsCount, setProjectsCount] = useState(0);

  const [tasksCount, setTasksCount] = useState(0);

  const [loading, setLoading] = useState(true);

  const getOverview = async () => {
    try {
      setLoading(true);

      const [projectsResponse, tasksResponse] = await Promise.all([
        api.get("/projects"),

        api.get("/tasks/my"),
      ]);

      if (projectsResponse.data.success) {
        setProjectsCount(projectsResponse.data.count);
      }

      if (tasksResponse.data.success) {
        const incompleteTasks = tasksResponse.data.data.filter(
          (task) => task.status !== "completed",
        );

        setTasksCount(incompleteTasks.length);
      }
    } catch (error) {
      console.log("Workspace Overview Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOverview();
  }, []);

  return (
    <section className="dashboard-widget workspace-overview">
      <h2>Workspace Overview</h2>

      <div className="overview-grid">
        <div className="overview-card">
          <span>Projects</span>

          <strong>{loading ? "..." : projectsCount}</strong>
        </div>

        <div className="overview-card">
          <span>Tasks</span>

          <strong>{loading ? "..." : tasksCount}</strong>
        </div>
      </div>
    </section>
  );
}

export default WorkspaceOverview;
