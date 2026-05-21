import { Card, CardContent, Box, Chip } from "@mui/material";
import { Task } from "../../types/task";
import { Calendar } from "lucide-react";

type Props = {
  task: Task;
  onClick?: () => void;
};

const priorityColors: Record<string, { bg: string; color: string }> = {
  LOW:    { bg: "#f0fdf4", color: "#16a34a" },
  MEDIUM: { bg: "#fffbeb", color: "#d97706" },
  HIGH:   { bg: "#fef2f2", color: "#dc2626" },
};

export function TaskCard({ task, onClick }: Props) {
  const pc = priorityColors[task.priority] ?? priorityColors.MEDIUM;
  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "DONE";

  return (
    <Card
      sx={{
        cursor: onClick ? "pointer" : "default",
        "&:hover": onClick ? { boxShadow: "0 4px 12px rgba(0,0,0,0.09)" } : {},
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Box
          component="span"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            fontSize: 13.5,
            fontWeight: 500,
            mb: 1,
          }}
        >
          {task.title}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <Chip
            label={task.priority}
            size="small"
            sx={{
              bgcolor: pc.bg,
              color: pc.color,
              fontWeight: 600,
              height: 20,
              fontSize: "0.65rem",
            }}
          />

          {task.dueDate && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.4,
                color: isOverdue ? "#dc2626" : "#94a3b8",
              }}
            >
              <Calendar size={11} />
              <Box
                component="span"
                sx={{ fontSize: 11, color: "inherit" }}
              >
                {new Date(task.dueDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </Box>
            </Box>
          )}

          {task.assignee && (
            <Box
              sx={{
                ml: "auto",
                width: 22,
                height: 22,
                borderRadius: "50%",
                bgcolor: "#4f46e5",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 600,
              }}
            >
              {task.assignee.name[0].toUpperCase()}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}