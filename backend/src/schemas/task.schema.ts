import { z } from "zod";

const TaskStatusEnum = z.enum(["TODO", "IN_PROGRESS", "DONE"]);
const TaskPriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH"]);

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Task title is required").max(200),
    description: z.string().max(1000).optional(),
    status: TaskStatusEnum.optional(),
    priority: TaskPriorityEnum.optional(),
    dueDate: z.string().optional().nullable(),
    assigneeId: z.string().optional().nullable()
  })
});

export const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(200).optional(),
    description: z.string().max(1000).optional(),
    status: TaskStatusEnum.optional(),
    priority: TaskPriorityEnum.optional(),
    dueDate: z.string().optional().nullable(),
    assigneeId: z.string().optional().nullable()
  })
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>["body"];
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>["body"];