import { api } from "./client";
import { unwrap } from "./unwrap";
import { ApiResponse } from "../types/api";
import { Task } from "../types/task";

export const tasksApi = {
  getByProject: async (projectId: string): Promise<Task[]> => {
    const res = await api.get<ApiResponse<Task[]>>(`/projects/${projectId}/tasks`);
    return unwrap(res.data);
  },

  create: async (data: Partial<Task> & { projectId: string }): Promise<Task> => {
    const res = await api.post<ApiResponse<Task>>(`/projects/${data.projectId}/tasks`, data);
    return unwrap(res.data);
  },

  update: async (id: string, data: Partial<Task>): Promise<Task> => {
    const res = await api.patch<ApiResponse<Task>>(`/tasks/${id}`, data);
    return unwrap(res.data);
  },

  remove: async (id: string): Promise<void> => {
    const res = await api.delete<ApiResponse<void>>(`/tasks/${id}`);
    unwrap(res.data);
  }
};