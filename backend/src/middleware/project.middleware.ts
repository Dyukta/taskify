import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { AppError } from "../lib/errors";

export async function requireProjectMember(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const projectId = (req.params["id"] ?? req.params["projectId"]) as string;
    const userId = req.user!.id;

    const member = await prisma.projectMember.findUnique({
      where: { projectId_userId: { projectId, userId } }
    });

    if (!member) throw new AppError("You are not a member of this project", 403);
    next();
  } catch (err) {
    next(err);
  }
}

export async function requireProjectAdmin(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const projectId = (req.params["id"] ?? req.params["projectId"]) as string;
    const userId = req.user!.id;

    const member = await prisma.projectMember.findUnique({
      where: { projectId_userId: { projectId, userId } }
    });

    if (!member || member.role !== "ADMIN") {
      throw new AppError("Admin access required", 403);
    }
    next();
  } catch (err) {
    next(err);
  }
}