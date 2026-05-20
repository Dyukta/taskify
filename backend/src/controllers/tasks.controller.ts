import { Request, Response } from "express";
import { asyncHandler } from "../lib/asyncHandler";
import * as TaskService from "../services/tasks.service";
import { CreateTaskInput, UpdateTaskInput } from "../schemas/task.schema";

export const getProjectTasks = asyncHandler(async (req: Request, res: Response) => {
  const { status, priority, assigneeId } = req.query as Record<string, string>;
  const tasks = await TaskService.getProjectTasks(req.params["id"] as string, { status, priority, assigneeId });
  res.json({ success: true, data: tasks });
});

export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const task = await TaskService.createTask(req.params["id"] as string, req.user!.id, req.body as CreateTaskInput);
  res.status(201).json({ success: true, data: task });
});

export const getTask = asyncHandler(async (req: Request, res: Response) => {
  const task = await TaskService.getTaskById(req.params["id"] as string, req.user!.id);
  res.json({ success: true, data: task });
});

export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const task = await TaskService.updateTask(req.params["id"] as string, req.user!.id, req.body as UpdateTaskInput);
  res.json({ success: true, data: task });
});

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  await TaskService.deleteTask(req.params["id"] as string, req.user!.id);
  res.status(204).send();
});