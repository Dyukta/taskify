import { Request, Response } from "express";
import { asyncHandler } from "../lib/asyncHandler";
import * as ProjectService from "../services/projects.service";
import { CreateProjectInput, UpdateProjectInput } from "../schemas/project.schema";

export const getProjects = asyncHandler(async (req: Request, res: Response) => {
  const projects = await ProjectService.getUserProjects(req.user!.id);
  res.json({ success: true, data: projects });
});

export const createProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await ProjectService.createProject(req.user!.id, req.body as CreateProjectInput);
  res.status(201).json({ success: true, data: project });
});

export const getProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await ProjectService.getProjectById(req.params["id"] as string, req.user!.id);
  res.json({ success: true, data: project });
});

export const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await ProjectService.updateProject(req.params["id"] as string, req.body as UpdateProjectInput);
  res.json({ success: true, data: project });
});

export const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  await ProjectService.deleteProject(req.params["id"] as string);
  res.status(204).send();
});