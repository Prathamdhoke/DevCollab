import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import api from "../api/axios.js";

import { useAuth } from "../context/AuthContext.jsx";

import EditProject from "../components/Projects/EditProject";

import CreateTask from "../components/Projects/CreateTask";

import InviteMember from "../components/Projects/InviteMember";

import "./ProjectWorkspace.css";

import { Users, CalendarDays, Pencil, Trash2 } from "lucide-react";

function ProjectWorkspace() {
  const { projectId } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();

  const [project, setProject] = useState(null);

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [tasksLoading, setTasksLoading] = useState(true);

  const [error, setError] = useState("");

  const [deleting, setDeleting] = useState(false);

  const [showEditProject, setShowEditProject] = useState(false);

  const [showCreateTask, setShowCreateTask] = useState(false);

  const [showInviteMember, setShowInviteMember] = useState(false);

  /* =====================================================
                    GET PROJECT
  ===================================================== */

  const getProject = async () => {
    try {
      setLoading(true);

      setError("");

      const response = await api.get(`/projects/${projectId}`);

      setProject(response.data.data);
    } catch (error) {
      console.log("Project Workspace Error:", error);

      setError(error.response?.data?.message || "Failed to load project.");
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
                    GET TASKS
  ===================================================== */

  const getTasks = async () => {
    try {
      setTasksLoading(true);

      const response = await api.get(`/projects/${projectId}/tasks`);

      if (response.data.success) {
        setTasks(response.data.data);
      }
    } catch (error) {
      console.log("Get Tasks Error:", error);
    } finally {
      setTasksLoading(false);
    }
  };

  /* =====================================================
                    LOAD PROJECT
  ===================================================== */

  useEffect(() => {
    getProject();

    getTasks();
  }, [projectId]);

  /* =====================================================
                UPDATE TASK STATUS
  ===================================================== */

  const handleTaskToggle = async (task) => {
    const newStatus = task.status === "completed" ? "todo" : "completed";

    try {
      const response = await api.patch(`/tasks/${task._id}/status`, {
        status: newStatus,
      });

      if (response.data.success) {
        setTasks((previousTasks) =>
          previousTasks.map((previousTask) =>
            previousTask._id === task._id ? response.data.data : previousTask,
          ),
        );
      }
    } catch (error) {
      console.log("Update Task Status Error:", error);

      alert(error.response?.data?.message || "Failed to update task.");
    }
  };

  /* =====================================================
                    DELETE PROJECT
  ===================================================== */

  const handleDeleteProject = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.name}"? This action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      await api.delete(`/projects/${projectId}`);

      navigate("/projects");
    } catch (error) {
      console.log("Delete Project Error:", error);

      alert(error.response?.data?.message || "Failed to delete project.");
    } finally {
      setDeleting(false);
    }
  };

  /* =====================================================
                PROJECT UPDATED
  ===================================================== */

  const handleProjectUpdated = (updatedProject) => {
    setProject(updatedProject);
  };

  /* =====================================================
                    LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="project-workspace">
        <section className="workspace-card">
          <p>Loading project...</p>
        </section>
      </div>
    );
  }

  /* =====================================================
                    ERROR
  ===================================================== */

  if (error) {
    return (
      <div className="project-workspace">
        <section className="workspace-card">
          <h2>Project Not Found</h2>

          <p>{error}</p>
        </section>
      </div>
    );
  }

  /* =====================================================
                PROJECT NOT FOUND
  ===================================================== */

  if (!project) {
    return (
      <div className="project-workspace">
        <section className="workspace-card">
          <h2>Project Not Found</h2>
        </section>
      </div>
    );
  }

  /* =====================================================
                    OWNER CHECK
  ===================================================== */

  const isOwner = project.owner?._id?.toString() === user?._id?.toString();

  const memberCount = project.members?.length || 0;

  const createdDate = project.createdAt
    ? new Date(project.createdAt).toLocaleDateString()
    : "—";

  /* =====================================================
                    TASK FILTERING
  ===================================================== */

  const myTasks = tasks.filter(
    (task) => task.assignedTo?._id?.toString() === user?._id?.toString(),
  );

  const teamTasks = tasks.filter(
    (task) => task.assignedTo?._id?.toString() !== user?._id?.toString(),
  );

  return (
    <div className="project-workspace">
      {/* ==========================
              PROJECT HEADER
      ========================== */}

      <section className="workspace-header">
        <div>
          <h1>{project.name}</h1>

          <p>{project.description || "No description provided."}</p>
        </div>

        <div className="workspace-info">
          <span>{project.status}</span>

          <span>{project.visibility}</span>

          <span>
            <Users size={16} />
            {memberCount} Members
          </span>

          <span>
            <CalendarDays size={16} />
            Created {createdDate}
          </span>
        </div>

        {/* ==========================
                OWNER ACTIONS
        ========================== */}

        {isOwner && (
          <div className="workspace-actions">
            <button
              className="create-task-btn"
              type="button"
              onClick={() => {
                setShowCreateTask(true);
              }}
            >
              + Create Task
            </button>

            <button
              className="invite-member-btn"
              type="button"
              onClick={() => {
                setShowInviteMember(true);
              }}
            >
              + Invite Member
            </button>

            <button
              className="edit-project-btn"
              type="button"
              onClick={() => {
                setShowEditProject(true);
              }}
            >
              <Pencil size={16} />
              Edit Project
            </button>

            <button
              className="delete-project-btn"
              type="button"
              onClick={handleDeleteProject}
              disabled={deleting}
            >
              <Trash2 size={16} />

              {deleting ? "Deleting..." : "Delete Project"}
            </button>
          </div>
        )}
      </section>

      {/* ==========================
              TECHNOLOGIES
      ========================== */}

      <section className="workspace-card">
        <h2>Technologies</h2>

        {project.technologies?.length > 0 ? (
          <div className="workspace-technologies">
            {project.technologies.map((technology, index) => (
              <span key={index} className="workspace-tech">
                {technology}
              </span>
            ))}
          </div>
        ) : (
          <p>No technologies added yet.</p>
        )}
      </section>

      {/* ==========================
              PROJECT MEMBERS
      ========================== */}

      <section className="workspace-card">
        <h2>Project Members</h2>

        {project.members?.length > 0 ? (
          <div className="workspace-members">
            {project.members.map((member) => {
              const isProjectOwner =
                project.owner?._id?.toString() === member._id?.toString();

              return (
                <div key={member._id} className="workspace-member">
                  <div className="member-avatar">
                    {member.name?.charAt(0).toUpperCase()}
                  </div>

                  <div className="member-info">
                    <strong>{member.name}</strong>

                    <p>@{member.username}</p>

                    {isProjectOwner && (
                      <span className="member-owner-badge">Owner</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No members found.</p>
        )}
      </section>

      {/* ==========================
                    TASKS
      ========================== */}

      <div className="task-grid">
        {/* ======================
                MY TASKS
        ====================== */}

        <section className="workspace-card">
          <h2>My Tasks</h2>

          {tasksLoading ? (
            <div className="workspace-empty-state">
              <span>Loading tasks...</span>
            </div>
          ) : myTasks.length === 0 ? (
            <div className="workspace-empty-state">
              <span>No tasks assigned to you.</span>
            </div>
          ) : (
            myTasks.map((task) => (
              <label key={task._id} className="task-item">
                <input
                  type="checkbox"
                  checked={task.status === "completed"}
                  onChange={() => handleTaskToggle(task)}
                />

                <div className="task-content">
                  <strong
                    className={
                      task.status === "completed" ? "task-completed" : ""
                    }
                  >
                    {task.title}
                  </strong>

                  <p>Due: {new Date(task.deadline).toLocaleDateString()}</p>
                </div>
              </label>
            ))
          )}
        </section>

        {/* ======================
                TEAM TASKS
        ====================== */}

        <section className="workspace-card">
          <h2>Team Tasks</h2>

          {tasksLoading ? (
            <div className="workspace-empty-state">
              <span>Loading tasks...</span>
            </div>
          ) : teamTasks.length === 0 ? (
            <div className="workspace-empty-state">
              <span>No team tasks yet.</span>
            </div>
          ) : (
            teamTasks.map((task) => (
              <div key={task._id} className="task-item">
                <div className="task-content">
                  <strong
                    className={
                      task.status === "completed" ? "task-completed" : ""
                    }
                  >
                    {task.title}
                  </strong>

                  <p>
                    {task.assignedTo?.name}

                    {" • Due: "}

                    {new Date(task.deadline).toLocaleDateString()}
                  </p>
                </div>

                <span
                  className={
                    task.status === "completed"
                      ? "task-status-completed"
                      : "task-status-pending"
                  }
                >
                  {task.status === "completed" ? "Completed" : "Pending"}
                </span>
              </div>
            ))
          )}
        </section>
      </div>

      {/* ==========================
              CREATE TASK MODAL
      ========================== */}

      {showCreateTask && (
        <CreateTask
          project={project}
          onClose={() => {
            setShowCreateTask(false);
          }}
          onCreated={(newTask) => {
            setTasks((previousTasks) => [...previousTasks, newTask]);
          }}
        />
      )}

      {/* ==========================
        INVITE MEMBER MODAL
      ========================== */}

      {showInviteMember && (
        <InviteMember
          project={project}
          onClose={() => {
            setShowInviteMember(false);
          }}
          onInvited={() => {
            setShowInviteMember(false);
          }}
        />
      )}

      {/* ==========================
              EDIT PROJECT MODAL
      ========================== */}

      {showEditProject && (
        <EditProject
          project={project}
          onClose={() => {
            setShowEditProject(false);
          }}
          onUpdated={handleProjectUpdated}
        />
      )}
    </div>
  );
}

export default ProjectWorkspace;
