import TaskCard from "./TaskCard"

import type { Task, TaskStatus } from "@/types"

interface ColumnProps {
  status: TaskStatus
  label: string
  tasks: Task[]
  dotColor: string
  onTaskClick?: (task: Task) => void
}

export default function Column({
  label,
  tasks,
  dotColor,
  onTaskClick,
}: ColumnProps) {
  return (
    <div className="w-72 flex-shrink-0">
      <div className="mb-3 flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: dotColor }}
        />

        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>

        <span className="ml-auto rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-400 dark:bg-gray-800">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => onTaskClick?.(task)}
          />
        ))}

        {tasks.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-200 py-8 text-center text-xs text-gray-400 dark:border-gray-800">
            No tasks
          </div>
        )}
      </div>
    </div>
  )
}