interface ConfirmProps {
  open: boolean
  title: string
  desc?: string
  onConfirm: () => void
  onCancel: () => void
}

export default function Confirm({
  open,
  title,
  desc,
  onConfirm,
  onCancel,
}: ConfirmProps) {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onCancel}
      />

      <div className="relative w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-gray-900">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>

        {desc && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {desc}
          </p>
        )}

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}