import { prisma } from "../lib/prisma";

type TaskSummary = {
  status: string;
  priority: string;
  dueDate: Date | null;
  projectId: string;
};

type ProjectSummary = {
  id: string;
  name: string;
  _count: { tasks: number };
};

export async function getDashboardStats(userId: string) {
  const userProjects = await prisma.projectMember.findMany({
    where: { userId },
    select: { projectId: true }
  });

  const projectIds = userProjects.map((p: { projectId: string }) => p.projectId);

  const [tasks, tasksByProject] = await Promise.all([
    prisma.task.findMany({
      where: { projectId: { in: projectIds } },
      select: { status: true, priority: true, dueDate: true, projectId: true }
    }),
    prisma.project.findMany({
      where: { id: { in: projectIds } },
      select: { id: true, name: true, _count: { select: { tasks: true } } }
    })
  ]);

  const now = new Date();

  const totalTasks = tasks.length;
  const todoTasks = tasks.filter((t: TaskSummary) => t.status === "TODO").length;
  const inProgressTasks = tasks.filter((t: TaskSummary) => t.status === "IN_PROGRESS").length;
  const completedTasks = tasks.filter((t: TaskSummary) => t.status === "DONE").length;
  const overdueTasks = tasks.filter(
    (t: TaskSummary) => t.dueDate && t.dueDate < now && t.status !== "DONE"
  ).length;

  return {
    totalTasks,
    todoTasks,
    inProgressTasks,
    completedTasks,
    overdueTasks,
    tasksByStatus: [
  { status: "TODO", count: todoTasks },
  { status: "IN_PROGRESS", count: inProgressTasks },
  { status: "DONE", count: completedTasks }
],

tasksByPriority: [
  { priority: "LOW", count: tasks.filter(t => t.priority === "LOW").length },
  { priority: "MEDIUM", count: tasks.filter(t => t.priority === "MEDIUM").length },
  { priority: "HIGH", count: tasks.filter(t => t.priority === "HIGH").length }
],
    tasksPerProject: tasksByProject.map((p: ProjectSummary) => ({
      projectId: p.id,
      projectName: p.name,
      taskCount: p._count.tasks
    })),
  };
}