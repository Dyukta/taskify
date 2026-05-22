import { Card, CardContent, Box, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Project } from "../../types/project";
import { FolderKanban } from "lucide-react";

type Props = { project: Project };

export function ProjectCard({ project }: Props) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        cursor: "pointer",
        transition: "box-shadow 0.15s",
        "&:hover": { boxShadow: "0 4px 16px rgba(0,0,0,0.10)" },
      }}
      onClick={() => navigate(`/projects/${project.id}`)}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              bgcolor: "#eef2ff",
              color: "#4f46e5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FolderKanban size={18} />
          </Box>
          <Box
            component="span"
            sx={{ fontWeight: 600, fontSize: 14, display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
          >
            {project.name}
          </Box>
        </Box>

        {project.description && (
          <Box
            component="span"
            sx={{
              fontSize: 12.5,
              color: "text.secondary",
              mb: 2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}
          >
            {project.description}
          </Box>
        )}

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1.5 }}>
          <Chip
            label={`${project.members?.length ?? 0} members`}
            size="small"
            sx={{ bgcolor: "#f1f5f9", color: "#475569" }}
          />
          {project._count && (
            <Chip
              label={`${project._count.tasks} tasks`}
              size="small"
              sx={{ bgcolor: "#f1f5f9", color: "#475569" }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}