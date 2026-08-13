import { useEffect, useState } from "react";

import "./UpcomingDeadlines.css";

import api from "../../../api/axios.js";

function UpcomingDeadlines() {
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const getUpcomingDeadlines = async () => {
    try {
      setLoading(true);

      const response = await api.get("/tasks/my");

      if (response.data.success) {
        const priorityTasks = response.data.data

          .filter((task) => task.status !== "completed")

          .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))

          .slice(0, 4);

        setTasks(priorityTasks);
      }
    } catch (error) {
      console.log("Upcoming Deadlines Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUpcomingDeadlines();
  }, []);

  return (
    <section className="dashboard-widget upcoming-deadlines">
      <h2>Upcoming Deadlines</h2>

      <div className="deadline-list">
        {loading ? (
          <p>Loading deadlines...</p>
        ) : tasks.length === 0 ? (
          <p>No upcoming deadlines.</p>
        ) : (
          tasks.map((task) => (
            <div className="deadline-card" key={task._id}>
              <div>
                <h4>{task.title}</h4>

                <span>{task.project?.name || "Project"}</span>
              </div>

              <strong>{new Date(task.deadline).toLocaleDateString()}</strong>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default UpcomingDeadlines;
