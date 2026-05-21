import { Box, Avatar, Divider, Paper } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Mail, User } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <Box>
      <Box component="span" sx={{ display: "block", fontWeight: 700, fontSize: 20, mb: 3 }}>
        Profile
      </Box>

      <Paper
        elevation={0}
        sx={{
          border: "1px solid #e2e8f0",
          borderRadius: 2.5,
          maxWidth: 480,
          overflow: "hidden",
        }}
      >
        <Box sx={{ bgcolor: "#4f46e5", height: 80 }} />
        <Box sx={{ px: 3, pb: 3 }}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: "#3730a3",
              fontSize: 22,
              fontWeight: 700,
              mt: -3.5,
              mb: 1.5,
              border: "3px solid white",
            }}
          >
            {user.name[0].toUpperCase()}
          </Avatar>
          <Box component="span" sx={{ display: "block", fontWeight: 700, fontSize: 17 }}>
            {user.name}
          </Box>
          <Box
            component="span"
            sx={{ display: "block", fontSize: 13, color: "text.secondary", mb: 2.5 }}
          >
            Member
          </Box>

          <Divider sx={{ mb: 2.5 }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <User size={15} color="#94a3b8" />
              <Box component="span" sx={{ fontSize: 13.5 }}>{user.name}</Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Mail size={15} color="#94a3b8" />
              <Box component="span" sx={{ fontSize: 13.5 }}>{user.email}</Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}