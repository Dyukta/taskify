import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

interface EmptyProps {
  icon: LucideIcon
  title: string
  desc?: string
  action?: ReactNode
}

export default function Empty({
  icon: Icon,
  title,
  desc,
  action,
}: EmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
        <Icon size={22} className="text-gray-400" />
      </div>

      <p className="text-sm font-medium text-gray-900 dark:text-white">
        {title}
      </p>

      {desc && (
        <p className="mt-1 text-xs text-gray-400">
          {desc}
        </p>
      )}

      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}