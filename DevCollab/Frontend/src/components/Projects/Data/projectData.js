const projectData = {

    projects: [

        {

            id: 1,

            name: "DevCollab",

            description:
                "Developer collaboration platform for managing projects and teams.",

            progress: 72,

            status: "Active",

            priority: "High",

            dueDate: "2026-08-15",

            teamSize: 5,

            createdBy: "Pratham",

            instructions: [
                "Complete the dashboard before starting backend integration.",
                "Follow the established folder architecture.",
                "Every completed task must be marked immediately."
            ],

            myTasks: [

                {
                    id: 1,
                    title: "Dashboard UI",
                    completed: true
                },

                {
                    id: 2,
                    title: "Projects Module",
                    completed: false
                },

                {
                    id: 3,
                    title: "Authentication API",
                    completed: false
                }

            ],

            teamTasks: [

                {
                    id: 1,
                    member: "Rahul",
                    title: "MongoDB Models",
                    completed: false
                },

                {
                    id: 2,
                    member: "Riya",
                    title: "Landing Page",
                    completed: true
                },

                {
                    id: 3,
                    member: "Aman",
                    title: "Socket Setup",
                    completed: false
                }

            ],

            activity: [

                {
                    id: 1,
                    user: "Pratham",
                    action: "completed Dashboard UI",
                    time: "2 hours ago"
                },

                {
                    id: 2,
                    user: "Riya",
                    action: "updated Landing Page",
                    time: "Yesterday"
                }

            ]

        }

    ]

};

export default projectData;