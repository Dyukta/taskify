import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  User,
} from "lucide-react";
import { Box } from "@mui/material";

const links = [
  { label: "Dashboard", path: "/",        icon: LayoutDashboard },
  { label: "Projects",  path: "/projects", icon: FolderKanban   },
  { label: "Tasks",     path: "/tasks",    icon: CheckSquare    },
  { label: "Team",      path: "/team",     icon: Users          },
  { label: "Profile",   path: "/profile",  icon: User           },
];

export function Sidebar() {
  return (
    <Box
      sx={{
        width: 220,
        flexShrink: 0,
        bgcolor: "white",
        borderRight: "1px solid #e2e8f0",
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        p: 2,
        gap: 0.5,
      }}
    >
      <Box sx={{ px: 1, py: 1.5, mb: 1 }}>
        <Box
          component="span"
          sx={{ fontWeight: 700, fontSize: 18, color: "primary.main", display: "block" }}
        >
          Taskify
        </Box>
      </Box>

      {links.map(({ label, path, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          end={path === "/"}
          style={{ textDecoration: "none" }}
        >
          {({ isActive }) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 1.5,
                py: 1,
                borderRadius: 2,
                cursor: "pointer",
                bgcolor: isActive ? "primary.main" : "transparent",
                color: isActive ? "white" : "#64748b",
                transition: "all 0.15s",
                "&:hover": !isActive
                  ? { bgcolor: "#f1f5f9", color: "#0f172a" }
                  : {},
              }}
            >
              <Icon size={16} />
              <Box
                component="span"
                sx={{
                  fontSize: 13.5,
                  fontWeight: isActive ? 600 : 500,
                }}
              >
                {label}
              </Box>
            </Box>
          )}
        </NavLink>
      ))}
    </Box>
  );
}