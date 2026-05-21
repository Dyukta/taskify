import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { projectsApi } from "../api/projects.api";

export const useProjects = () =>
  useQuery({ queryKey: ["projects"], queryFn: projectsApi.getAll });

export const useProject = (id: string) =>
  useQuery({
    queryKey: ["project", id],
    queryFn: () => projectsApi.getById(id),
    enabled: !!id,
  });

export const useProjectMembers = (id: string) =>
  useQuery({
    queryKey: ["project-members", id],
    queryFn: () => projectsApi.getMembers(id),
    enabled: !!id,
  });

export const useCreateProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: projectsApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
};

export const useUpdateProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name?: string; description?: string } }) =>
      projectsApi.update(id, data),
    onSuccess: (_d, vars) => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      qc.invalidateQueries({ queryKey: ["project", vars.id] });
    },
  });
};

export const useDeleteProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: projectsApi.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
};

export const useAddMember = (projectId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { email: string; role: string }) =>
      projectsApi.addMember(projectId, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["project-members", projectId] }),
  });
};

export const useRemoveMember = (projectId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (memberId: string) => projectsApi.removeMember(projectId, memberId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["project-members", projectId] }),
  });
};