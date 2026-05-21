import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title required"),
  description: z.string().optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  dueDate: z.string().optional(),
  assigneeId: z.string().optional(),
});

export type TaskSchema = z.infer<typeof taskSchema>;