import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function Error() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2
      }}
    >
      <AlertTriangle size={40} color="#ef4444" />
      <Box component="span" sx={{ display: "block", fontWeight: 700, fontSize: 20 }}>
        Page not found
      </Box>
      <Box component="span" sx={{ display: "block", fontSize: 13.5, color: "text.secondary" }}>
        The page you're looking for doesn't exist.
      </Box>
      <Button variant="contained" size="small" onClick={() => navigate("/")}>
        Go home
      </Button>
    </Box>
  );
}