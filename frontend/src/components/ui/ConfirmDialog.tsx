import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box} from "@mui/material";

type Props = {
  open: boolean;
  title?: string;
  description?: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export function ConfirmDialog({
  open,
  title = "Confirm",
  description = "Are you sure?",
  loading,
  onConfirm,
  onClose
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontSize: 15, fontWeight: 600 }}>{title}</DialogTitle>
      <DialogContent>
        <Box
          component="span"
          sx={{ fontSize: 13.5, color: "text.secondary", display: "block" }}
        >
          {description}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          disabled={loading}
          size="small"
          sx={{ color: "#64748b" }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          disabled={loading}
          variant="contained"
          color="error"
          size="small"
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}