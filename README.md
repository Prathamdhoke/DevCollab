# DevCollab

A full-stack developer collaboration platform for managing projects, assigning tasks, inviting teammates, and chatting in real time — built with the MERN stack.

---

## Overview

DevCollab gives development teams a shared workspace to create and manage projects, track tasks and deadlines, send project invitations, and communicate through live messaging. The app uses JWT cookie-based authentication, REST APIs for CRUD operations, and Socket.io for real-time chat and online presence.

**Live demo**

- Frontend: [devcollab-phi.vercel.app](https://devcollab-phi.vercel.app)
- Backend: [devcollab-ux7k.onrender.com](https://devcollab-ux7k.onrender.com)

---

## Features

### Implemented

- **Authentication** — Sign up, login, logout with secure HTTP-only JWT cookies
- **User profiles** — Edit bio, role, location, skills, and social links
- **Project management** — Create, view, update, and delete projects with status, visibility, and tech stack tags
- **Team collaboration** — Invite users to projects by username; accept or reject invitations from the notifications page
- **Task management** — Project owners assign tasks with deadlines; assignees update task status
- **Calendar** — View personal task deadlines on a monthly calendar (FullCalendar)
- **Real-time messaging** — 1:1 chat with project contacts, username search, online/offline status via Socket.io
- **Dashboard** — Workspace overview, priority tasks, upcoming deadlines, and continue-working widget

### In progress (UI prototype)

- **Teams module** — Frontend screens exist with mock data; backend Team model and APIs are not yet implemented
- **Activity feed** — Static dashboard widget; no backend event system yet

---

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 19, Vite, React Router v7, Axios, Socket.io Client, FullCalendar, Lucide React |
| **Backend** | Node.js, Express 5, Mongoose, Socket.io, JWT, bcryptjs |
| **Database** | MongoDB |
| **Deployment** | Vercel (frontend), Render (backend) |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React + Vite)                  │
│  Pages → Layouts → Components → AuthContext / axios / socket │
└──────────────────────────┬──────────────────────────────────┘
                           │ REST (cookies) + WebSocket
┌──────────────────────────▼──────────────────────────────────┐
│                   Backend (Express + Socket.io)              │
│         Routes → Controllers → Models → MongoDB              │
└─────────────────────────────────────────────────────────────┘
```

### Backend structure

```
DevCollab/Backend/
├── server.js                 # Entry point, DB connect, Socket.io setup
└── src/
    ├── app.js                # Express app, CORS, route mounting
    ├── config/               # Database, cookie options
    ├── constants/            # HTTP status codes
    ├── controllers/          # Business logic
    ├── middleware/           # JWT auth (protect)
    ├── models/               # Mongoose schemas
    ├── routes/               # API route definitions
    └── utils/                # Token generation & response helpers
```

### Frontend structure

```
DevCollab/Frontend/
├── src/
│   ├── api/axios.js          # Axios instance (withCredentials)
│   ├── context/AuthContext.jsx
│   ├── socket/socket.js      # Socket.io client
│   ├── pages/                # Route-level pages
│   ├── components/
│   │   ├── Layouts/          # Feature layout shells (Sidebar + header)
│   │   ├── DashBoard/        # Dashboard widgets
│   │   ├── Projects/         # Project CRUD, tasks, invites
│   │   ├── Messages/         # Chat UI
│   │   ├── Profile/          # Profile sections
│   │   ├── Calendar/         # Calendar components
│   │   ├── Teams/            # Teams UI (mock data)
│   │   └── Sidebar/          # Shared navigation
│   ├── App.jsx               # Router configuration
│   └── main.jsx              # App bootstrap
└── vercel.json               # SPA rewrites for deployment
```

---

## Data Models

| Model | Description |
|-------|-------------|
| **User** | Authentication, profile, skills, social links, online status |
| **Project** | Name, owner, members, status, visibility, technologies |
| **Task** | Title, project, assignee, creator, deadline, status |
| **ProjectInvitation** | Pending/accepted/rejected project invites |
| **Conversation** | 1:1 chat between two users |
| **Message** | Text messages within a conversation |

---

## API Reference

All protected routes require a valid JWT stored in the `token` cookie.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Login |
| `POST` | `/api/auth/logout` | Logout |
| `GET` | `/api/auth/me` | Get current user |
| `GET` | `/api/profile` | Get profile |
| `PUT` | `/api/profile` | Update profile |
| `GET` | `/api/projects` | List user's projects |
| `POST` | `/api/projects` | Create project |
| `GET` | `/api/projects/:id` | Get project |
| `PUT` | `/api/projects/:id` | Update project (owner) |
| `DELETE` | `/api/projects/:id` | Delete project (owner) |
| `POST` | `/api/projects/:id/invitations` | Send invitation (owner) |
| `GET` | `/api/invitations` | List pending invitations |
| `PATCH` | `/api/invitations/:id/accept` | Accept invitation |
| `PATCH` | `/api/invitations/:id/reject` | Reject invitation |
| `POST` | `/api/projects/:id/tasks` | Create task (owner) |
| `GET` | `/api/projects/:id/tasks` | List project tasks |
| `GET` | `/api/tasks/my` | List tasks assigned to current user |
| `PATCH` | `/api/tasks/:id/status` | Update task status (assignee) |
| `DELETE` | `/api/tasks/:id` | Delete task (owner) |
| `GET` | `/api/conversations` | List conversations |
| `POST` | `/api/conversations` | Start or open a conversation |
| `GET` | `/api/conversations/contacts` | List project contacts |
| `GET` | `/api/conversations/search` | Search user by username |
| `GET` | `/api/messages/:conversationId` | Get messages |
| `POST` | `/api/messages/:conversationId` | Send message (REST) |

### Socket.io events

| Event | Direction | Purpose |
|-------|-----------|---------|
| `join-conversation` | Client → Server | Join a chat room |
| `send-message` | Client → Server | Send and persist a message |
| `new-message` | Server → Client | Receive a message in real time |
| `user-status` | Server → Client | Online/offline presence updates |

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/DevCollab.git
cd DevCollab
```

### 2. Backend setup

```bash
cd DevCollab/Backend
npm install
```

Create `DevCollab/Backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/devcollab
JWT_SECRET=your_jwt_secret_here
```

Start the backend:

```bash
npm run dev
```

The API runs at `http://localhost:5000`.

### 3. Frontend setup

```bash
cd DevCollab/Frontend
npm install
```

Create `DevCollab/Frontend/.env`:

```env
VITE_BACKEND_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

---

## Environment Variables

### Backend (`DevCollab/Backend/.env`)

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: `5000`) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |

### Frontend (`DevCollab/Frontend/.env`)

| Variable | Description |
|----------|-------------|
| `VITE_BACKEND_URL` | Backend API base URL (e.g. `http://localhost:5000/api`) |

---

## Scripts

### Backend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start with nodemon |
| `npm start` | Start production server |

### Frontend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## Deployment

| Service | Platform | Notes |
|---------|----------|-------|
| Frontend | Vercel | SPA routing via `vercel.json` |
| Backend | Render | Socket.io + REST on same server |
| Database | MongoDB Atlas | Connection via `MONGO_URI` |

CORS is configured for local development and the Vercel production domains. Cookies use `sameSite: "none"` and `secure: true` for cross-origin auth.

---

## Roadmap

- [ ] Teams module — backend model, routes, and API integration
- [ ] Notification system — persistent notifications beyond project invitations
- [ ] Activity feed — backend event/audit log
- [ ] Task kanban board — full status workflow (`todo`, `in-progress`, `review`, `completed`)
- [ ] Environment-based Socket.io URL on the frontend

---

## Author

**Pratham**

---

## License

This project is open source and available under the [MIT License](LICENSE).
