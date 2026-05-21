import { Box, CircularProgress, Avatar, Chip } from "@mui/material";
import { useProjects } from "../hooks/useProjects";
import { useQueries } from "@tanstack/react-query";
import { projectsApi } from "../api/projects.api";
import { useMemo } from "react";
import { ProjectMember } from "../types/project";

export default function Team() {
  const { data: projects = [], isLoading: loadingProjects } = useProjects();

  const memberQueries = useQueries({
    queries: projects.map((p) => ({
      queryKey: ["project-members", p.id],
      queryFn: () => projectsApi.getMembers(p.id),
      enabled: !!p.id,
    })),
  });

  const isLoading = loadingProjects || memberQueries.some((q) => q.isLoading);

  const uniqueMembers = useMemo(() => {
    const all: ProjectMember[] = memberQueries.flatMap((q) => q.data ?? []);
    const seen = new Set<string>();
    return all.filter((m) => {
      if (seen.has(m.userId)) return false;
      seen.add(m.userId);
      return true;
    });
  }, [memberQueries]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", pt: 10 }}>
        <CircularProgress size={32} />
      </Box>
    );
  }

  return (
    <Box>
      <Box component="span" sx={{ display: "block", fontWeight: 700, fontSize: 20, mb: 3 }}>
        Team
      </Box>

      {uniqueMembers.length === 0 ? (
        <Box component="span" sx={{ fontSize: 13.5, color: "text.secondary", display: "block" }}>
          No team members found.
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 2,
          }}
        >
          {uniqueMembers.map((m) => (
            <Box
              key={m.userId}
              sx={{
                bgcolor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: 2.5,
                p: 2.5,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Avatar sx={{ bgcolor: "#4f46e5", width: 40, height: 40 }}>
                {m.user.name[0].toUpperCase()}
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 600,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {m.user.name}
                </Box>
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    fontSize: 12,
                    color: "text.secondary",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {m.user.email}
                </Box>
              </Box>
              <Chip
                label={m.role}
                size="small"
                sx={{
                  bgcolor: m.role === "ADMIN" ? "#eef2ff" : "#f1f5f9",
                  color: m.role === "ADMIN" ? "#4f46e5" : "#64748b",
                  fontWeight: 600,
                  fontSize: "0.65rem",
                }}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}