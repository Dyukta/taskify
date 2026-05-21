import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { X } from "lucide-react";
import { ProjectForm } from "../components/forms/ProjectForm";

type Props = { open: boolean; onClose: () => void };

export function CreateProject({ open, onClose }: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pb: 1 }}>
        New project
        <IconButton size="small" onClick={onClose}><X size={16} /></IconButton>
      </DialogTitle>
      <DialogContent>
        <ProjectForm onSuccess={onClose} />
      </DialogContent>
    </Dialog>
  );
}