import { prisma } from "../lib/prisma";
import { AppError } from "../lib/errors";
import { CreateTaskInput, UpdateTaskInput } from "../schemas/task.schema";


const TASK_INCLUDE = {
  assignee: { select: { id: true, name: true, email: true } },
  createdBy: { select: { id: true, name: true, email: true } }
} as const;

export async function getProjectTasks(
  projectId: string,
  filters?: { status?: string; priority?: string; assigneeId?: string }
) {
  return prisma.task.findMany({
    where: {
      projectId,
      ...(filters?.status && { status: filters.status as never }),
      ...(filters?.priority && { priority: filters.priority as never }),
      ...(filters?.assigneeId && { assigneeId: filters.assigneeId }),
    },
    include: TASK_INCLUDE,
    orderBy: { createdAt: "desc" }
  });
}

export async function createTask(
  projectId: string,
  userId: string,
  data: CreateTaskInput
) {
  if (data.assigneeId) {
    const isMember = await prisma.projectMember.findUnique({
      where: { projectId_userId: { projectId, userId: data.assigneeId } }
    });
    if (!isMember) throw new AppError("Assignee is not a member of this project", 400);
  }

  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
      projectId,
      assigneeId: data.assigneeId ?? null,
      createdById: userId
    },
    include: TASK_INCLUDE,
  });
}

export async function getTaskById(taskId: string, userId: string) {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: TASK_INCLUDE,
  });
  if (!task) throw new AppError("Task not found", 404);

  const isMember = await prisma.projectMember.findUnique({
    where: { projectId_userId: { projectId: task.projectId, userId } },
  });
  if (!isMember) throw new AppError("Access denied", 403);

  return task;
}

export async function updateTask(
  taskId: string,
  userId: string,
  data: UpdateTaskInput
) {
  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) throw new AppError("Task not found", 404);

  const member = await prisma.projectMember.findUnique({
    where: { projectId_userId: { projectId: task.projectId, userId } },
  });
  if (!member) throw new AppError("Access denied", 403);

  if (member.role === "MEMBER") {
    if (task.assigneeId !== userId) {
      throw new AppError("You can only update tasks assigned to you", 403);
    }

    const { status, assigneeId } = data;
    return prisma.task.update({
      where: { id: taskId },
      data: {
        ...(status !== undefined && { status }),
        ...(assigneeId !== undefined && { assigneeId }),
      },
      include: TASK_INCLUDE
    });
  }
  return prisma.task.update({
    where: { id: taskId },
    data: {
      ...data,
      dueDate: data.dueDate !== undefined ? (data.dueDate ? new Date(data.dueDate) : null) : undefined,
    },
    include: TASK_INCLUDE
  });
}

export async function deleteTask(taskId: string, userId: string) {
  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) throw new AppError("Task not found", 404);

  const member = await prisma.projectMember.findUnique({
    where: { projectId_userId: { projectId: task.projectId, userId } }
  });
  if (!member || member.role !== "ADMIN") {
    throw new AppError("Only admins can delete tasks", 403);
  }
  await prisma.task.delete({ where: { id: taskId } });
}