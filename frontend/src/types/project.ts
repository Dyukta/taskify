import { User } from "./user";

export type MemberRole = "ADMIN" | "MEMBER";

export type ProjectMember = {
  id: string;
  userId: string;
  role: MemberRole;
  joinedAt: string;
  user: User;
};

export type Project = {
  id: string;
  name: string;
  description?: string;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  members: ProjectMember[];
  _count?: { tasks: number };
};