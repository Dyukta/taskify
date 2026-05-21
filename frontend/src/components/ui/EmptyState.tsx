import { Box, Button } from "@mui/material";
import { Inbox } from "lucide-react";

type Props = {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({ title, description, actionLabel, onAction }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 10,
        gap: 1.5,
      }}
    >
      <Box sx={{ bgcolor: "#f1f5f9", borderRadius: 3, p: 2, mb: 0.5 }}>
        <Inbox size={28} color="#94a3b8" />
      </Box>
      <Box component="span" sx={{ fontWeight: 600, fontSize: 15, display: "block" }}>
        {title}
      </Box>
      {description && (
        <Box
          component="span"
          sx={{ fontSize: 13, color: "text.secondary", display: "block" }}
        >
          {description}
        </Box>
      )}
      {actionLabel && onAction && (
        <Button variant="contained" size="small" onClick={onAction} sx={{ mt: 1 }}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}