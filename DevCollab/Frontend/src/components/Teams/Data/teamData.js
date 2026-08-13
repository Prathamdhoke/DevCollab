const teamData = {

    invitations: [

        {

            id: 1,

            teamId: 4,

            teamName: "AI Research Team",

            description:
                "Researching and building AI powered products.",

            invitedBy: "Rahul Sharma",

            members: 4,

            projects: 2,

            leader: "Rahul Sharma"

        },

        {

            id: 2,

            teamId: 5,

            teamName: "Open Source Squad",

            description:
                "Building open source developer tools.",

            invitedBy: "Riya Patel",

            members: 8,

            projects: 5,

            leader: "Riya Patel"

        }

    ],



    teams: [

        {

            id: 1,

            name: "Development Team",

            description:
                "Building the DevCollab platform and managing product development.",

            owner: "You",

            currentUserRole: "owner",



            members: [

                {

                    id: 1,

                    name: "You",

                    email: "you@devcollab.com",

                    role: "owner"

                },

                {

                    id: 2,

                    name: "Rahul Sharma",

                    email: "rahul@gmail.com",

                    role: "co-owner"

                },

                {

                    id: 3,

                    name: "Riya Patel",

                    email: "riya@gmail.com",

                    role: "member"

                },

                {

                    id: 4,

                    name: "Aman Verma",

                    email: "aman@gmail.com",

                    role: "member"

                }

            ],



            projects: [

                {

                    id: 1,

                    name: "DevCollab"

                },

                {

                    id: 2,

                    name: "Portfolio"

                },

                {

                    id: 3,

                    name: "Landing Page"

                }

            ],



            pendingInvitations: [

                {

                    id: 1,

                    teamName: "Development Team",

                    invitedBy: "You",

                    members: 5

                }

            ],



            pendingRequests: [

                {

                    id: 1,

                    requestedBy: "Rahul Sharma",

                    targetMember: "Aman Verma"

                }

            ],



            activity: [

                {

                    id: 1,

                    title: "New Member Joined",

                    description:
                        "Riya Patel joined the team.",

                    time: "5 min ago"

                },

                {

                    id: 2,

                    title: "Project Created",

                    description:
                        "DevCollab project was created.",

                    time: "2 hours ago"

                },

                {

                    id: 3,

                    title: "Task Assigned",

                    description:
                        "Dashboard UI assigned to Rahul.",

                    time: "Yesterday"

                }

            ]

        },



        {

            id: 2,

            name: "AI Interview Team",

            description:
                "Developing AI interview preparation platform.",

            owner: "Rahul Sharma",

            currentUserRole: "member",

            members: [],

            projects: [],

            pendingInvitations: [],

            pendingRequests: [],

            activity: []

        },



        {

            id: 3,

            name: "Portfolio Team",

            description:
                "Maintaining company portfolio website.",

            owner: "Riya Patel",

            currentUserRole: "co-owner",

            members: [],

            projects: [],

            pendingInvitations: [],

            pendingRequests: [],

            activity: []

        }

    ]

};

export default teamData;