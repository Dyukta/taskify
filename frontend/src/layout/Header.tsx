import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Avatar } from "@mui/material";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const titles: Record<string, string> = {
  "/": "Dashboard",
  "/projects": "Projects",
  "/tasks": "Tasks",
  "/team": "Team",
  "/profile": "Profile",
};

function getTitle(pathname: string): string {
  if (pathname.startsWith("/projects/")) return "Project Details";
  return titles[pathname] ?? "Taskify";
}

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        height: 60,
        bgcolor: "white",
        borderBottom: "1px solid #e2e8f0",
        px: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
      }}
    >
      <Box component="span" sx={{ fontWeight: 600, fontSize: 15 }}>
        {getTitle(location.pathname)}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Avatar
          sx={{
            width: 30,
            height: 30,
            bgcolor: "primary.main",
            fontSize: 13,
          }}
        >
          {user?.name?.[0]?.toUpperCase()}
        </Avatar>
        <Box
          component="span"
          sx={{
            fontSize: 13,
            color: "text.secondary",
            display: { xs: "none", sm: "block" },
          }}
        >
          {user?.name}
        </Box>
        <Button
          size="small"
          variant="outlined"
          color="inherit"
          startIcon={<LogOut size={14} />}
          onClick={handleLogout}
          sx={{ color: "#64748b", borderColor: "#e2e8f0", fontSize: 12 }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}