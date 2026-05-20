import { NavLink } from "react-router-dom"
import {
  CheckSquare,
  FolderKanban,
  LayoutDashboard,
  Settings,
  User,
  Users,
  X,
  Zap,
} from "lucide-react"

import { cn } from "@/utils/helpers"

const links = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/projects",
    label: "Projects",
    icon: FolderKanban,
  },
  {
    to: "/my-tasks",
    label: "My Tasks",
    icon: CheckSquare,
  },
  {
    to: "/team",
    label: "Team",
    icon: Users,
  },
  {
    to: "/profile",
    label: "Profile",
    icon: User,
  },
  {
    to: "/settings",
    label: "Settings",
    icon: Settings,
  },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-30 flex h-full w-56 -translate-x-full flex-col border-r border-gray-200 bg-white transition-transform duration-200 dark:border-gray-800 dark:bg-gray-900",
          "lg:static lg:translate-x-0",
          open && "translate-x-0"
        )}
      >
        <div className="flex h-14 items-center gap-2 border-b border-gray-200 px-4 dark:border-gray-800">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500">
            <Zap size={14} className="text-white" />
          </div>

          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            FlowTask
          </span>

          <button
            type="button"
            onClick={onClose}
            className="ml-auto text-gray-400 hover:text-gray-600 lg:hidden"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-3">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-indigo-50 font-medium text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                )
              }
            >
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-gray-200 px-4 py-3 dark:border-gray-800">
          <p className="text-xs text-gray-400">FlowTask v1.0</p>
        </div>
      </aside>
    </>
  )
}