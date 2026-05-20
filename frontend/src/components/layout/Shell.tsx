import { useState } from "react"
import { Outlet } from "react-router-dom"

import type { Theme } from "@/App"

import Header from "./Header"
import Sidebar from "./Sidebar"

interface ShellProps {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export default function Shell({ theme, setTheme }: ShellProps) {
  const [open, setOpen] = useState(false)

  function openSidebar() {
    setOpen(true)
  }

  function closeSidebar() {
    setOpen(false)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      <Sidebar open={open} onClose={closeSidebar} />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header
          onMenuClick={openSidebar}
          theme={theme}
          setTheme={setTheme}
        />

        <main className="flex-1 overflow-y-auto p-5">
          <Outlet />
        </main>
      </div>
    </div>
  )
}