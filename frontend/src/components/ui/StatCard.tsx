import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  label: string
  value: number
  icon: LucideIcon
  iconBg: string
  iconColor: string
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  iconBg,
  iconColor,
}: StatCardProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        <p className="mt-0.5 text-2xl font-semibold text-gray-900 dark:text-white">
          {value}
        </p>
      </div>

      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBg}`}
      >
        <Icon size={18} className={iconColor} />
      </div>
    </div>
  )
}