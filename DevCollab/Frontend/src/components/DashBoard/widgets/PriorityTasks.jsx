import { useEffect, useState } from "react";

import "./PriorityTasks.css";

import api from "../../../api/axios.js";

function PriorityTasks() {
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const getPriorityTasks = async () => {
    try {
      setLoading(true);

      const response = await api.get("/tasks/my");

      if (response.data.success) {
        const incompleteTasks = response.data.data

          .filter((task) => task.status !== "completed")

          .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))

          .slice(0, 4);

        setTasks(incompleteTasks);
      }
    } catch (error) {
      console.log("Priority Tasks Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPriorityTasks();
  }, []);

  return (
    <section className="dashboard-widget priority-tasks">
      <h2>Priority Tasks</h2>

      <div className="task-list">
        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p>No priority tasks.</p>
        ) : (
          tasks.map((task) => (
            <div className="task-card" key={task._id}>
              <div className="task-info">
                <h4>{task.title}</h4>

                <p>Due : {new Date(task.deadline).toLocaleDateString()}</p>
              </div>

              <span className={`task-status ${task.status}`}>
                {task.status === "in-progress" ? "In Progress" : task.status}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default PriorityTasks;
