export type DashboardStats = {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  tasksByStatus?: { status: string; count: number }[];
  tasksByPriority?: { priority: string; count: number }[];
};