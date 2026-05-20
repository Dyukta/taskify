import Column from "./Column"

import type { Task, TaskStatus } from "@/types"

const columns: {
  status: TaskStatus
  label: string
  color: string
}[] = [
  {
    status: "todo",
    label: "To Do",
    color: "#94a3b8",
  },
  {
    status: "in_progress",
    label: "In Progress",
    color: "#3b82f6",
  },
  {
    status: "done",
    label: "Done",
    color: "#10b981",
  },
]

interface BoardProps {
  tasks: Task[]
  onTaskClick?: (task: Task) => void
}

export default function Board({ tasks, onTaskClick }: BoardProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((column) => (
        <Column
          key={column.status}
          status={column.status}
          label={column.label}
          dotColor={column.color}
          tasks={tasks.filter((task) => task.status === column.status)}
          onTaskClick={onTaskClick}
        />
      ))}
    </div>
  )
}