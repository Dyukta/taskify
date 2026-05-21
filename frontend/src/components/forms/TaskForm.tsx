import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Box, Alert, MenuItem } from "@mui/material";
import { taskSchema, TaskSchema } from "../../lib/zod/task.schema";
import { useCreateTask, useUpdateTask } from "../../hooks/useTasks";
import { Task } from "../../types/task";
import { useState } from "react";
import { ProjectMember } from "../../types/project";

type Props = {
  projectId: string;
  task?: Task;
  members?: ProjectMember[];
  onSuccess?: () => void;
};

export function TaskForm({ projectId, task, members = [], onSuccess }: Props) {
  const { mutateAsync: createTask } = useCreateTask(projectId);
  const { mutateAsync: updateTask } = useUpdateTask(projectId);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: task
      ? {
          title: task.title,
          description: task.description ?? "",
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate?.slice(0, 10),
          assigneeId: task.assigneeId,
        }
      : { status: "TODO", priority: "MEDIUM" },
  });

  const onSubmit = async (data: TaskSchema) => {
    try {
      setError("");
      if (task) {
        await updateTask({ id: task.id, data });
      } else {
        await createTask(data);
      }
      onSuccess?.();
    } catch (e: unknown) {
      setError((e as { message?: string })?.message ?? "Something went wrong");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      {error && (
        <Alert severity="error" sx={{ fontSize: 13 }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Title"
        fullWidth
        {...register("title")}
        error={!!errors.title}
        helperText={errors.title?.message}
      />
      <TextField
        label="Description"
        fullWidth
        multiline
        rows={2}
        {...register("description")}
      />

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <TextField select label="Status" fullWidth {...register("status")}>
          <MenuItem value="TODO">To Do</MenuItem>
          <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
          <MenuItem value="DONE">Done</MenuItem>
        </TextField>

        <TextField select label="Priority" fullWidth {...register("priority")}>
          <MenuItem value="LOW">Low</MenuItem>
          <MenuItem value="MEDIUM">Medium</MenuItem>
          <MenuItem value="HIGH">High</MenuItem>
        </TextField>
      </Box>

      {members.length > 0 && (
        <TextField select label="Assignee" fullWidth {...register("assigneeId")}>
          <MenuItem value="">Unassigned</MenuItem>
          {members.map((m) => (
            <MenuItem key={m.userId} value={m.userId}>
              {m.user.name}
            </MenuItem>
          ))}
        </TextField>
      )}

      <TextField
        label="Due date"
        type="date"
        fullWidth
        slotProps={{ inputLabel: { shrink: true } }}
        {...register("dueDate")}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : task ? "Update task" : "Create task"}
      </Button>
    </Box>
  );
}