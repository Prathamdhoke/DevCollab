const messageData = [
  {
    id: 1,

    name: "Rahul Sharma",

    email: "rahul.sharma@devcollab.com",

    avatar: "R",

    online: true,

    mutualTeams: 3,

    messages: [
      {
        id: 1,

        sender: "Rahul Sharma",

        text: "Hey! API Integration is completed.",

        time: "10:15 AM",

        mine: false,
      },

      {
        id: 2,

        sender: "You",

        text: "Great! I'll connect it with the frontend today.",

        time: "10:17 AM",

        mine: true,
      },

      {
        id: 3,

        sender: "Rahul Sharma",

        text: "Perfect. Let me know if you face any issues.",

        time: "10:18 AM",

        mine: false,
      },
    ],
  },

  {
    id: 2,

    name: "Aman Verma",

    email: "aman.verma@devcollab.com",

    avatar: "A",

    online: false,

    mutualTeams: 1,

    messages: [
      {
        id: 1,

        sender: "Aman Verma",

        text: "Can we discuss the UI changes?",

        time: "Yesterday",

        mine: false,
      },

      {
        id: 2,

        sender: "You",

        text: "Sure, let's do it after lunch.",

        time: "Yesterday",

        mine: true,
      },
    ],
  },

  {
    id: 3,

    name: "Riya Patel",

    email: "riya.patel@devcollab.com",

    avatar: "R",

    online: true,

    mutualTeams: 2,

    messages: [
      {
        id: 1,

        sender: "Riya Patel",

        text: "Landing page looks amazing!",

        time: "Monday",

        mine: false,
      },

      {
        id: 2,

        sender: "You",

        text: "Thanks! I still need to polish a few sections.",

        time: "Monday",

        mine: true,
      },
    ],
  },
];

export default messageData;
