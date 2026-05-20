export type Role = "owner" | "admin" | "member"

export type TaskStatus = "todo" | "in_progress" | "done"

export type Priority = "low" | "medium" | "high" | "urgent"

export interface User {
  id: string
  name: string
  email: string
}

export interface ProjectMember {
  user: User
  role: Role
  assignedTasks: number
}

export interface Project {
  id: string
  name: string
  description: string
  progress: number
  members: ProjectMember[]
  totalTasks: number
  completedTasks: number
  createdAt: string
}

export interface Task {
  id: string
  title: string
  status: TaskStatus
  priority: Priority
  dueDate: string
  assignee: User
  projectId: string
  projectName: string
}

export interface DashboardStats {
  total: number
  todo: number
  inProgress: number
  completed: number
  overdue: number
}

export interface ActivityItem {
  id: string
  user: User
  action: string
  target: string
  time: string
}

export interface DeadlineItem {
  id: string
  title: string
  project: string
  priority: Priority
  dueDate: string
}