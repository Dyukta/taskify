import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { X } from "lucide-react";
import { TaskForm } from "../components/forms/TaskForm";
import { Task } from "../types/task";
import { ProjectMember } from "../types/project";

type Props = {
  open: boolean;
  onClose: () => void;
  task: Task;
  members?: ProjectMember[];
};

export function EditTask({ open, onClose, task, members }: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pb: 1 }}>
        Edit task
        <IconButton size="small" onClick={onClose}><X size={16} /></IconButton>
      </DialogTitle>
      <DialogContent>
        <TaskForm projectId={task.projectId} task={task} members={members} onSuccess={onClose} />
      </DialogContent>
    </Dialog>
  );
}