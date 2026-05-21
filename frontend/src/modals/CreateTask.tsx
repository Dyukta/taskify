import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { X } from "lucide-react";
import { TaskForm } from "../components/forms/TaskForm";
import { ProjectMember } from "../types/project";

type Props = {
  open: boolean;
  onClose: () => void;
  projectId: string;
  members?: ProjectMember[];
};

export function CreateTask({ open, onClose, projectId, members }: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pb: 1 }}>
        New task
        <IconButton size="small" onClick={onClose}><X size={16} /></IconButton>
      </DialogTitle>
      <DialogContent>
        <TaskForm projectId={projectId} members={members} onSuccess={onClose} />
      </DialogContent>
    </Dialog>
  );
}