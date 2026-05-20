import { Calendar } from "lucide-react"

import type { Task } from "@/types"
import {
  avatarColor,
  initials,
  priorityBg,
  priorityColor,
} from "@/utils/helpers"

interface TaskCardProps {
  task: Task
  onClick?: () => void
}

export default function TaskCard({ task, onClick }: TaskCardProps) {
  const priority =
    task.priority.charAt(0).toUpperCase() + task.priority.slice(1)

  return (
    <div
      onClick={onClick}
      className="space-y-2 cursor-pointer rounded-lg border border-gray-200 bg-white p-3 transition-shadow hover:shadow-sm dark:border-gray-800 dark:bg-gray-900"
    >
      <p className="leading-snug text-sm font-medium text-gray-900 dark:text-white">
        {task.title}
      </p>

      <span
        className="inline-block rounded-full px-2 py-0.5 text-xs font-medium"
        style={{
          color: priorityColor(task.priority),
          backgroundColor: priorityBg(task.priority),
        }}
      >
        {priority}
      </span>

      <div className="flex items-center justify-between text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <Calendar size={11} />
          {task.dueDate}
        </span>

        <div
          title={task.assignee.name}
          className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium text-white"
          style={{
            backgroundColor: avatarColor(task.assignee.name),
          }}
        >
          {initials(task.assignee.name)}
        </div>
      </div>
    </div>
  )
}