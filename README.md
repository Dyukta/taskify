# Taskify

Taskify is a full stack collaborative task management platform designed for teams to organize projects, assign work and track progress through a structured workflow system.

It is built to reflect real team usage patterns with role based access control, task tracking and a live dashboard for project visibility.


live link : https://taskify-livid-eta.vercel.app/login

|                                                                                                           |                                                                                                           |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/426d931a-8af7-41d1-87b9-72626c8b34bf" width="100%"/> | <img src="https://github.com/user-attachments/assets/690d91fe-1e6d-491e-8a11-5b9a56bab31f" width="100%"/> |
| <img src="https://github.com/user-attachments/assets/58abbb0d-a0f7-4244-b8a3-01877fa2241f" width="100%"/> | <img src="https://github.com/user-attachments/assets/64961070-2f2f-4864-bb4d-70f4a3111ab6" width="100%"/> |
| <img src="https://github.com/user-attachments/assets/b109e3fd-52ae-45be-bc0c-58ce6bb002c2" width="100%"/> | <img src="https://github.com/user-attachments/assets/eecde730-a6ef-400e-87cc-b35eb2cf1910" width="100%"/> |
| <img src="https://github.com/user-attachments/assets/8660b65d-da2e-4fa3-8bf6-1b6d79c4cd0e" width="100%"/> | <img src="https://github.com/user-attachments/assets/e34ddd66-4727-457c-8fa4-09419eab6c17" width="100%"/> |

---

# What I Built

- JWT authentication with secure HttpOnly cookies
- Role-based access control (Admin / Member)
- Project and team management system
- Kanban-style task workflow
- Task assignment, filtering, priority and due dates
- Dashboard with aggregated analytics
- Responsive UI for desktop and mobile
- Protected routes with persistent sessions
---

# Tech Stack

## Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Material UI
- TanStack Query
- React Router
- Axios
- React Hook Form
- Zod
- Recharts

## Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication

---

# Engineering Decisions

## React + TypeScript
Used TypeScript across the stack to keep the codebase predictable, scalable and easier to maintain as features grow.

---

## TanStack Query
Handled caching, synchronization and API state without manual state management.

---

## Tailwind + Material UI
Used Tailwind for layout and responsiveness while using Material UI for complex interactive components like dialogs, forms, tables, menus and feedback states.

This gave faster development speed while keeping the UI consistent.

---

## Context API Instead of Redux
The application did not require a heavy global state solution.

Authentication state was handled with Context API while server state was managed through TanStack Query.

This kept the architecture simpler and easier to scale.

---

## Cookie-Based Authentication
Authentication uses secure HttpOnly cookies instead of localStorage to improve security and reduce XSS exposure.

---

# Tradeoffs

- No realtime updates (kept architecture simpler and stable)
- No GraphQL (REST chosen for speed and clarity)
- No optimistic updates (reduced UI complexity)
- No drag and drop Kanban (scope control)

---
# What This Project Demonstrates
- Full stack system design
- Authentication and authorization systems
- Role-based permissions at API level
- Relational database design with Prisma
- Production-ready deployment workflow
- Scalable React architecture patterns
---

# Deployment

| Service | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | Neon PostgreSQL |

---

# Future Improvements

- Drag and drop Kanban board
- Realtime updates
- Notifications
- Comments and activity logs
- File uploads
- Dark mode
- Automated testing
- CI/CD pipeline
