import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Box, Alert } from "@mui/material";
import { projectSchema, ProjectSchema } from "../../lib/zod/project.schema";
import { useCreateProject, useUpdateProject } from "../../hooks/useProjects";
import { Project } from "../../types/project";
import { useState } from "react";

type Props = {
  project?: Project;
  onSuccess?: () => void;
};

export function ProjectForm({ project, onSuccess }: Props) {
  const { mutateAsync: createProject } = useCreateProject();
  const { mutateAsync: updateProject } = useUpdateProject();
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProjectSchema>({
    resolver: zodResolver(projectSchema),
    defaultValues: project ? { name: project.name, description: project.description ?? "" } : undefined
    });

  const onSubmit = async (data: ProjectSchema) => {
    try {
      setError("");
      if (project) {
        await updateProject({ id: project.id, data });
      } else {
        await createProject(data);
      }
      onSuccess?.();
    } catch (e: unknown) {
      setError((e as { message?: string })?.message ?? "Something went wrong");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {error && <Alert severity="error" sx={{ fontSize: 13 }}>{error}</Alert>}
      <TextField label="Project name" fullWidth {...register("name")} error={!!errors.name} helperText={errors.name?.message} />
      <TextField label="Description" fullWidth multiline rows={3} {...register("description")} />
      <Button type="submit" variant="contained" fullWidth disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : project ? "Update project" : "Create project"}
      </Button>
    </Box>
  );
}