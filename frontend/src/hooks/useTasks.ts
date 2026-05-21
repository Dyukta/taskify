import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tasksApi } from "../api/tasks.api";
import { Task } from "../types/task";

export const useTasks = (projectId: string) =>
  useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => tasksApi.getByProject(projectId),
    enabled: !!projectId,
  });

export const useCreateTask = (projectId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Task>) => tasksApi.create({ ...data, projectId }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks", projectId] }),
  });
};

export const useUpdateTask = (projectId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Task> }) =>
      tasksApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks", projectId] }),
  });
};

export const useDeleteTask = (projectId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: tasksApi.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks", projectId] }),
  });
};