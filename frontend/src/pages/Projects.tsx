import { useState } from "react";
import { Box, Button, Alert, CircularProgress } from "@mui/material";
import { Plus } from "lucide-react";
import { useProjects, useDeleteProject } from "../hooks/useProjects";
import { ProjectCard } from "../components/ui/ProjectCard";
import { EmptyState } from "../components/ui/EmptyState";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { CreateProject } from "../modals/CreateProject";
import { EditProject } from "../modals/EditProject";
import { Project } from "../types/project";

export default function Projects() {
  const { data: projects, isLoading, isError } = useProjects();
  const { mutateAsync: deleteProject } = useDeleteProject();

  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Project | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteProject(deleteTarget.id);
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", pt: 10 }}>
        <CircularProgress size={32} />
      </Box>
    );
  }

  if (isError) return <Alert severity="error">Failed to load projects.</Alert>;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box component="span" sx={{ fontWeight: 700, fontSize: 20 }}>
          Projects
        </Box>
        <Button
          variant="contained"
          startIcon={<Plus size={16} />}
          onClick={() => setCreateOpen(true)}
          size="small"
        >
          New project
        </Button>
      </Box>

      {!projects?.length ? (
        <EmptyState
          title="No projects yet"
          description="Create your first project to start managing tasks."
          actionLabel="New project"
          onAction={() => setCreateOpen(true)}
        />
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 2,
          }}
        >
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </Box>
      )}

      <CreateProject open={createOpen} onClose={() => setCreateOpen(false)} />

      {editTarget && (
        <EditProject
          open={!!editTarget}
          onClose={() => setEditTarget(null)}
          project={editTarget}
        />
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete project"
        description={`Delete "${deleteTarget?.name}"? This cannot be undone.`}
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </Box>
  );
}