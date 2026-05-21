import { Box } from "@mui/material";
import { Column } from "./Column";
import { Task } from "../../types/task";

type Props = {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
};

const COLUMNS = [
  { status: "TODO" as const,        label: "To Do",      color: "#94a3b8" },
  { status: "IN_PROGRESS" as const, label: "In Progress", color: "#3b82f6" },
  { status: "DONE" as const,        label: "Done",        color: "#22c55e" },
];

export function Board({ tasks, onTaskClick }: Props) {
  return (
    <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 1, minHeight: 400 }}>
      {COLUMNS.map(({ status, label, color }) => (
        <Column
          key={status}
          title={label}
          color={color}
          tasks={tasks.filter((t) => t.status === status)}
          onTaskClick={onTaskClick}
        />
      ))}
    </Box>
  );
}