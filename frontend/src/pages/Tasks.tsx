import { useState } from "react";
import { Box, Alert, CircularProgress, ToggleButton, ToggleButtonGroup, MenuItem, TextField } from "@mui/material";
import { LayoutGrid, List } from "lucide-react";
import { useProjects } from "../hooks/useProjects";
import { useTasks } from "../hooks/useTasks";
import { Board } from "../components/board/Board";
import { TaskCard } from "../components/ui/TaskCard";
import { EmptyState } from "../components/ui/EmptyState";
import { EditTask } from "../modals/EditTask";
import { Task } from "../types/task";

export default function Tasks() {
  const { data: projects = [], isLoading: loadingProjects } = useProjects();
  const [selectedProject, setSelectedProject] = useState("");
  const [view, setView] = useState<"board" | "list">("board");
  const [editTask, setEditTask] = useState<Task | null>(null);

  const projectId = selectedProject || projects[0]?.id || "";
  const { data: tasks = [], isLoading: loadingTasks, isError } = useTasks(projectId);
  const currentProject = projects.find((p) => p.id === projectId);

  if (loadingProjects) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", pt: 10 }}>
        <CircularProgress size={32} />
      </Box>
    );
  }

  if (!projects.length) {
    return (
      <EmptyState
        title="No projects"
        description="Create a project first to see tasks."
      />
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box component="span" sx={{ fontWeight: 700, fontSize: 20 }}>
          Tasks
        </Box>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            select
            size="small"
            value={projectId}
            onChange={(e) => setSelectedProject(e.target.value)}
            sx={{ minWidth: 180 }}
            label="Project"
          >
            {projects.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.name}
              </MenuItem>
            ))}
          </TextField>

          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={(_, v) => v && setView(v)}
            size="small"
          >
            <ToggleButton value="board"><LayoutGrid size={15} /></ToggleButton>
            <ToggleButton value="list"><List size={15} /></ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load tasks.
        </Alert>
      )}

      {loadingTasks ? (
        <Box sx={{ display: "flex", justifyContent: "center", pt: 8 }}>
          <CircularProgress size={28} />
        </Box>
      ) : tasks.length === 0 ? (
        <EmptyState
          title="No tasks"
          description={`No tasks in "${currentProject?.name}".`}
        />
      ) : view === "board" ? (
        <Board tasks={tasks} onTaskClick={(t) => setEditTask(t)} />
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {tasks.map((t) => (
            <TaskCard key={t.id} task={t} onClick={() => setEditTask(t)} />
          ))}
        </Box>
      )}

      {editTask && (
        <EditTask
          open={!!editTask}
          onClose={() => setEditTask(null)}
          task={editTask}
        />
      )}
    </Box>
  );
}