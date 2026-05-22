import { api } from "./client";
import { unwrap } from "./unwrap";
import { ApiResponse } from "../types/api";
import { Project, ProjectMember } from "../types/project";

export const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    const res = await api.get<ApiResponse<Project[]>>("/projects");
    return unwrap(res.data);
  },

  getById: async (id: string): Promise<Project> => {
    const res = await api.get<ApiResponse<Project>>(`/projects/${id}`);
    return unwrap(res.data);
  },

  create: async (data: { name: string; description?: string }): Promise<Project> => {
    const res = await api.post<ApiResponse<Project>>("/projects", data);
    return unwrap(res.data);
  },

  update: async (id: string, data: { name?: string; description?: string }): Promise<Project> => {
    const res = await api.patch<ApiResponse<Project>>(`/projects/${id}`, data);
    return unwrap(res.data);
  },

  remove: async (id: string): Promise<void> => {
    const res = await api.delete<ApiResponse<void>>(`/projects/${id}`);
    unwrap(res.data);
  },

  getMembers: async (id: string): Promise<ProjectMember[]> => {
    const res = await api.get<ApiResponse<ProjectMember[]>>(`/projects/${id}/members`);
    return unwrap(res.data);
  },

  addMember: async (id: string, data: { email: string; role: string }): Promise<ProjectMember> => {
    const res = await api.post<ApiResponse<ProjectMember>>(`/projects/${id}/members`, data);
    return unwrap(res.data);
  },

  removeMember: async (id: string, memberId: string): Promise<void> => {
    const res = await api.delete<ApiResponse<void>>(`/projects/${id}/members/${memberId}`);
    unwrap(res.data);
  },

  updateMemberRole: async (id: string, memberId: string, role: string): Promise<ProjectMember> => {
    const res = await api.patch<ApiResponse<ProjectMember>>(`/projects/${id}/members/${memberId}`, { role });
    return unwrap(res.data);
  }
};