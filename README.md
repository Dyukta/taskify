# Taskify

Taskify is a collaborative task management platform built to support real team workflows with project organization, task tracking, role-based access, and analytics.

The goal was to build something that feels modern and intuitive like Linear, Trello and Asana while keeping the architecture scalable and production oriented.


live link : https://taskify-livid-eta.vercel.app/login

|                                                                                                           |                                                                                                           |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/426d931a-8af7-41d1-87b9-72626c8b34bf" width="100%"/> | <img src="https://github.com/user-attachments/assets/690d91fe-1e6d-491e-8a11-5b9a56bab31f" width="100%"/> |
| <img src="https://github.com/user-attachments/assets/58abbb0d-a0f7-4244-b8a3-01877fa2241f" width="100%"/> | <img src="https://github.com/user-attachments/assets/64961070-2f2f-4864-bb4d-70f4a3111ab6" width="100%"/> |
| <img src="https://github.com/user-attachments/assets/b109e3fd-52ae-45be-bc0c-58ce6bb002c2" width="100%"/> | <img src="https://github.com/user-attachments/assets/eecde730-a6ef-400e-87cc-b35eb2cf1910" width="100%"/> |
| <img src="https://github.com/user-attachments/assets/8660b65d-da2e-4fa3-8bf6-1b6d79c4cd0e" width="100%"/> | <img src="https://github.com/user-attachments/assets/e34ddd66-4727-457c-8fa4-09419eab6c17" width="100%"/> |

---

# What I Built

- Secure authentication with JWT and HttpOnly cookies
- Role-based access control for admins and members
- Project and team management
- Kanban-style task workflow
- Task filtering, assignment, priorities, and due dates
- Dashboard analytics and charts
- Responsive UI for desktop and mobile
- Reusable component architecture
- Form validation and centralized error handling
- Protected frontend routing and persistent sessions

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
Handled API state, caching, mutations and invalidation through TanStack Query instead of manually managing async state.

This reduced boilerplate and improved reliability around server synchronization.

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

# Things I Focused On

- Clean and modular folder structure
- Reusable components and hooks
- Strict TypeScript usage
- Minimal prop drilling
- Proper loading, error, and empty states
- Responsive design
- Real-world permission handling
- Separation between admin and member capabilities
- Production-ready deployment structure

---

# Tradeoffs

## Tailwind + MUI Together
This slightly increases bundle size, but significantly improves development speed and maintainability.

---

## REST API Instead of GraphQL
REST was simpler and more practical for the scope of this project while still keeping the backend clean and scalable.

---

## No Realtime Features
Realtime collaboration and sockets were intentionally skipped to prioritize building a stable and maintainable core product first.

---

# Deployment

| Service | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | Neon PostgreSQL |

---

# What I Learned

This project helped strengthen practical experience with:

- Full stack architecture
- Authentication systems
- Role-based authorization
- Query management
- Database relations with Prisma
- Production deployment
- Scalable React patterns
- Error handling and validation
- Building maintainable TypeScript applications

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
