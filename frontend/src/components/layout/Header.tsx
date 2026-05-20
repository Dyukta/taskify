import { Bell, Menu, Moon, Search, Sun } from "lucide-react"
import { useLocation } from "react-router-dom"

import type { Theme } from "@/App"
import { avatarColor, initials } from "@/utils/helpers"

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/projects": "Projects",
  "/my-tasks": "My Tasks",
  "/team": "Team",
  "/profile": "Profile",
  "/settings": "Settings",
}

const currentUser = "Alex Morgan"

interface HeaderProps {
  onMenuClick: () => void
  theme: Theme
  setTheme: (theme: Theme) => void
}

export default function Header({
  onMenuClick,
  theme,
  setTheme,
}: HeaderProps) {
  const { pathname } = useLocation()

  const basePath = `/${pathname.split("/")[1]}`
  const title = titles[basePath] ?? "FlowTask"

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-900">
      <button
        type="button"
        onClick={onMenuClick}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 lg:hidden"
      >
        <Menu size={20} />
      </button>

      <span className="hidden text-sm font-semibold text-gray-900 dark:text-white sm:block">
        {title}
      </span>

      <div className="ml-2 flex-1 max-w-xs">
        <div className="relative">
          <Search
            size={13}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search tasks, projects..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-8 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <button
          type="button"
          className="relative rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        >
          <Bell size={16} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>

        <div
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-xs font-semibold text-white"
          style={{ backgroundColor: avatarColor(currentUser) }}
        >
          {initials(currentUser)}
        </div>
      </div>
    </header>
  )
}