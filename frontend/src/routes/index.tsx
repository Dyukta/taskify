import { Routes, Route } from "react-router-dom";
import { Shell } from "../layout/Shell";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import ProjectDetails from "../pages/ProjectDetails";
import Tasks from "../pages/Tasks";
import Team from "../pages/Team";
import Profile from "../pages/Profile";
import Error from "../pages/Error";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
      <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

      <Route path="/" element={<ProtectedRoute><Shell><Dashboard /></Shell></ProtectedRoute>} />
      <Route path="/projects" element={<ProtectedRoute><Shell><Projects /></Shell></ProtectedRoute>} />
      <Route path="/projects/:id" element={<ProtectedRoute><Shell><ProjectDetails /></Shell></ProtectedRoute>} />
      <Route path="/tasks" element={<ProtectedRoute><Shell><Tasks /></Shell></ProtectedRoute>} />
      <Route path="/team" element={<ProtectedRoute><Shell><Team /></Shell></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Shell><Profile /></Shell></ProtectedRoute>} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}