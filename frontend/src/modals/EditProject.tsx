import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { X } from "lucide-react";
import { ProjectForm } from "../components/forms/ProjectForm";
import { Project } from "../types/project";

type Props = { open: boolean; onClose: () => void; project: Project };

export function EditProject({ open, onClose, project }: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pb: 1 }}>
        Edit project
        <IconButton size="small" onClick={onClose}><X size={16} /></IconButton>
      </DialogTitle>
      <DialogContent>
        <ProjectForm project={project} onSuccess={onClose} />
      </DialogContent>
    </Dialog>
  );
}