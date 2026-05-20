import { useEffect, useState } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import Shell from "@/components/layout/Shell"
import Dashboard from "@/pages/Dashboard"
import Error from "@/pages/Error"
import Login from "@/pages/Login"
import Profile from "@/pages/Profile"
import Project from "@/pages/Project"
import Projects from "@/pages/Projects"
import Register from "@/pages/Register"
import Settings from "@/pages/Settings"
import Tasks from "@/pages/Tasks"
import Team from "@/pages/Team"

export type Theme = "light" | "dark"

function getInitialTheme(): Theme {
  const storedTheme = localStorage.getItem("theme")

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme
  }

  return "light"
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<Shell theme={theme} setTheme={setTheme} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<Project />} />
          <Route path="/my-tasks" element={<Tasks />} />
          <Route path="/team" element={<Team />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/settings"
            element={
              <Settings
                theme={theme}
                setTheme={setTheme}
              />
            }
          />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}