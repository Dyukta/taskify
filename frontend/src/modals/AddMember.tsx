import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem, Alert, IconButton } from "@mui/material";
import { X } from "lucide-react";
import { useAddMember } from "../hooks/useProjects";

type Props = { open: boolean; onClose: () => void; projectId: string };

export function AddMember({ open, onClose, projectId }: Props) {
  const { mutateAsync: addMember } = useAddMember(projectId);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("MEMBER");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!email.trim()) return;
    try {
      setError("");
      setLoading(true);
      await addMember({ email: email.trim(), role });
      setEmail("");
      setRole("MEMBER");
      onClose();
    } catch (e: unknown) {
      setError((e as { message?: string })?.message ?? "Failed to add member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pb: 1 }}>
        Add member
        <IconButton size="small" onClick={onClose}><X size={16} /></IconButton>
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
        {error && <Alert severity="error" sx={{ fontSize: 13 }}>{error}</Alert>}
        <TextField label="Email" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField select label="Role" fullWidth value={role} onChange={(e) => setRole(e.target.value)}>
          <MenuItem value="MEMBER">Member</MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} size="small" sx={{ color: "#64748b" }}>Cancel</Button>
        <Button onClick={handleAdd} variant="contained" size="small" disabled={loading || !email.trim()}>
          {loading ? "Adding..." : "Add member"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}