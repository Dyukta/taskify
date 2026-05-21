import { Box } from "@mui/material";
import { TaskCard } from "../ui/TaskCard";
import { Task } from "../../types/task";

type Props = {
  title: string;
  tasks: Task[];
  color?: string;
  onTaskClick?: (task: Task) => void;
};

export function Column({ title, tasks, color = "#4f46e5", onTaskClick }: Props) {
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 240,
        bgcolor: "#f8fafc",
        borderRadius: 2.5,
        border: "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
        maxHeight: "100%",
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 1,
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: color }} />
        <Box
          component="span"
          sx={{ fontSize: 13, fontWeight: 600, color: "text.primary" }}
        >
          {title}
        </Box>
        <Box
          component="span"
          sx={{
            ml: "auto",
            bgcolor: "#e2e8f0",
            color: "#64748b",
            px: 1,
            py: 0.2,
            borderRadius: 1,
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          {tasks.length}
        </Box>
      </Box>

      <Box
        sx={{
          p: 1.5,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          overflowY: "auto",
          flex: 1,
        }}
      >
        {tasks.length === 0 ? (
          <Box
            component="span"
            sx={{
              fontSize: 12,
              color: "text.disabled",
              textAlign: "center",
              py: 3,
              display: "block",
            }}
          >
            No tasks
          </Box>
        ) : (
          tasks.map((t) => (
            <TaskCard
              key={t.id}
              task={t}
              onClick={onTaskClick ? () => onTaskClick(t) : undefined}
            />
          ))
        )}
      </Box>
    </Box>
  );
}