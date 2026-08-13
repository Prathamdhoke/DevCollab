const dashboardData = {
  /* ==========================
            USER
    ========================== */

  user: {
    id: 1,
    name: "Pratham",
    role: "Software Developer",
    avatar: "P",
  },

  /* ==========================
            HEADER
    ========================== */

  header: {
    searchPlaceholder: "Search projects, tasks...",
  },

  /* ==========================
        CONTINUE WORKING
    ========================== */

  continueWorking: {
    title: "Continue Working",
    subtitle: "Pick up exactly where you left off.",
    projectId: 1,
    taskId: 1,
  },

  /* ==========================
        PROJECTS
========================== */

  projects: [
    {
      id: 1,
      name: "DevCollab",
      progress: 72,
      members: 5,
      status: "active",
    },

    {
      id: 2,
      name: "AI Interview Portal",
      progress: 45,
      members: 3,
      status: "active",
    },

    {
      id: 3,
      name: "Portfolio Website",
      progress: 100,
      members: 1,
      status: "completed",
    },
  ],

  /* ==========================
          TASKS
========================== */

  tasks: [
    {
      id: 1,
      projectId: 1,
      title: "Dashboard UI Development",
      status: "in-progress",
      dueDate: "2026-08-05",
      assignedTo: 1,
    },

    {
      id: 2,
      projectId: 1,
      title: "Create MongoDB Models",
      status: "todo",
      dueDate: "2026-08-08",
      assignedTo: 1,
    },

    {
      id: 3,
      projectId: 1,
      title: "Implement Authentication",
      status: "todo",
      dueDate: "2026-08-10",
      assignedTo: 1,
    },

    {
      id: 4,
      projectId: 1,
      title: "Design Project Page",
      status: "review",
      dueDate: "2026-08-12",
      assignedTo: 1,
    },
  ],

  /* ==========================
              TEAMS
    ========================== */

  teams: [
    {
      id: 1,
      name: "Development Team",
      members: 5,
    },
  ],

  /* ==========================
          NOTIFICATIONS
    ========================== */

  notifications: [],

  /* ==========================
        ACTIVITY FEED
========================== */

  activityFeed: [
    {
      id: 1,
      user: "Riya",
      action: "completed",
      target: "Login Page UI",
      time: "2h ago",
    },

    {
      id: 2,
      user: "Rahul",
      action: "commented on",
      target: "Authentication API",
      time: "5h ago",
    },

    {
      id: 3,
      user: "Pratham",
      action: "created",
      target: "Dashboard",
      time: "Yesterday",
    },
  ],

  /* ==========================
            DEADLINES
    ========================== */

  deadlines: [],

  /* ==========================
      DASHBOARD OVERVIEW
    ========================== */

  workspaceOverview: {
    title: "Workspace Overview",

    stats: [
      {
        label: "Projects",
        value: 1,
      },

      {
        label: "Tasks",
        value: 3,
      },

      {
        label: "Teams",
        value: 1,
      },

      {
        label: "Reviews",
        value: 2,
      },
    ],
  },

  /* ==========================
        UPCOMING DEADLINES
========================== */

  upcomingDeadlines: {
    title: "Upcoming Deadlines",
  },
};

export default dashboardData;
