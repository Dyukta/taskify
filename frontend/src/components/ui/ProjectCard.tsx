import { CheckSquare, ListTodo } from "lucide-react"
import { useNavigate } from "react-router-dom"

import type { Project } from "@/types"
import { avatarColor, initials } from "@/utils/helpers"

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate()

  function handleClick() {
    navigate(`/projects/${project.id}`)
  }

  const visibleMembers = project.members.slice(0, 4)

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
    >
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
        {project.name}
      </h3>

      <p className="mt-1 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
        {project.description}
      </p>

      <div className="mt-4">
        <div className="mb-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>

        <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800">
          <div
            className="h-1.5 rounded-full bg-indigo-500"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex -space-x-2">
          {visibleMembers.map(({ user }) => (
            <div
              key={user.id}
              title={user.name}
              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-xs font-medium text-white dark:border-gray-900"
              style={{ backgroundColor: avatarColor(user.name) }}
            >
              {initials(user.name)}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <ListTodo size={13} />
            {project.totalTasks}
          </span>

          <span className="flex items-center gap-1">
            <CheckSquare size={13} />
            {project.completedTasks}
          </span>
        </div>
      </div>
    </div>
  )
}