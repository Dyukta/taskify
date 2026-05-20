import { prisma } from "../lib/prisma";
import { AppError } from "../lib/errors";
import { CreateProjectInput, UpdateProjectInput } from "../schemas/project.schema";

const MEMBER_USER_SELECT = { id: true, name: true, email: true };

export async function getUserProjects(userId: string) {
  return prisma.project.findMany({
    where: { members: { some: { userId } } },
    include: {
      createdBy: { select: MEMBER_USER_SELECT },
      _count: { select: { tasks: true, members: true } },
    },
    orderBy: { createdAt: "desc" }
  });
}

export async function createProject(userId: string, data: CreateProjectInput) {
  return prisma.project.create({
    data: {
      name: data.name,
      description: data.description,
      createdById: userId,
      members: { create: { userId, role: "ADMIN" } },
    },
    include: {
      createdBy: { select: MEMBER_USER_SELECT },
      _count: { select: { tasks: true, members: true } }
    }
  });
}

export async function getProjectById(projectId: string, userId: string) {
  const member = await prisma.projectMember.findUnique({
    where: { projectId_userId: { projectId, userId } }
  });
  if (!member) throw new AppError("Project not found or access denied", 404);

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      createdBy: { select: MEMBER_USER_SELECT },
      members: {
        include: { user: { select: MEMBER_USER_SELECT } },
        orderBy: { joinedAt: "asc" },
      },
      _count: { select: { tasks: true } }
    }
  });
  if (!project) throw new AppError("Project not found", 404);
  return project;
}

export async function updateProject(projectId: string, data: UpdateProjectInput) {
  return prisma.project.update({
    where: { id: projectId },
    data,
    include: {
      createdBy: { select: MEMBER_USER_SELECT },
      _count: { select: { tasks: true, members: true } }
    }
  });
}

export async function deleteProject(projectId: string) {
  await prisma.project.delete({ where: { id: projectId } });
}