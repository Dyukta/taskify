import type { ReactNode } from "react"

interface Column<T> {
  key: string
  header: string
  render: (row: T) => ReactNode
}

interface TableProps<T> {
  data: T[]
  cols: Column<T>[]
  emptyMsg?: string
}

export default function Table<T>({
  data,
  cols,
  emptyMsg = "No data",
}: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/50">
            {cols.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={cols.length}
                className="py-10 text-center text-sm text-gray-400"
              >
                {emptyMsg}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 transition-colors last:border-0 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/40"
              >
                {cols.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}