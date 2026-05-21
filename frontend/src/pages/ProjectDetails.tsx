import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box, Button, Tabs, Tab, Alert,
  CircularProgress, Chip, Avatar, IconButton, Tooltip,
} from "@mui/material";
import { Plus, UserPlus, Trash2, ArrowLeft } from "lucide-react";
import {
  useProject, useProjectMembers,
  useDeleteProject, useRemoveMember,
} from "../hooks/useProjects";
import { useTasks } from "../hooks/useTasks";
import { Board } from "../components/board/Board";
import { TaskCard } from "../components/ui/TaskCard";
import { EmptyState } from "../components/ui/EmptyState";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { CreateTask } from "../modals/CreateTask";
import { EditTask } from "../modals/EditTask";
import { AddMember } from "../modals/AddMember";
import { Task } from "../types/task";
import { useAuth } from "../context/AuthContext";

export default function ProjectDetails() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: project, isLoading: loadingProject, isError: projectError } = useProject(id);
  const { data: members = [], isLoading: loadingMembers } = useProjectMembers(id);
  const { data: tasks = [], isLoading: loadingTasks } = useTasks(id);
  const { mutateAsync: deleteProject } = useDeleteProject();
  const { mutateAsync: removeMember } = useRemoveMember(id);

  const [tab, setTab] = useState(0);
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [removingMemberId, setRemovingMemberId] = useState<string | null>(null);

  const isAdmin = members.some((m) => m.userId === user?.id && m.role === "ADMIN");
  const isOwner = project?.createdById === user?.id;
  const canManage = isAdmin || isOwner;

  const handleDeleteProject = async () => {
    setDeleting(true);
    try {
      await deleteProject(id);
      navigate("/projects");
    } finally {
      setDeleting(false);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    setRemovingMemberId(memberId);
    try {
      await removeMember(memberId);
    } finally {
      setRemovingMemberId(null);
    }
  };

  if (loadingProject) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", pt: 10 }}>
        <CircularProgress size={32} />
      </Box>
    );
  }

  if (projectError || !project) {
    return <Alert severity="error">Project not found.</Alert>;
  }

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          mb: 3,
          gap: 2,
        }}
      >
        <Box>
          <Button
            size="small"
            startIcon={<ArrowLeft size={14} />}
            onClick={() => navigate("/projects")}
            sx={{ color: "#64748b", mb: 1, p: 0, minWidth: 0 }}
          >
            Projects
          </Button>
          <Box component="span" sx={{ display: "block", fontWeight: 700, fontSize: 20 }}>
            {project.name}
          </Box>
          {project.description && (
            <Box
              component="span"
              sx={{ display: "block", fontSize: 13, color: "text.secondary", mt: 0.5 }}
            >
              {project.description}
            </Box>
          )}
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          {canManage && (
            <>
              <Button
                size="small"
                variant="outlined"
                startIcon={<UserPlus size={14} />}
                onClick={() => setAddMemberOpen(true)}
                sx={{ borderColor: "#e2e8f0", color: "#64748b" }}
              >
                Add member
              </Button>
              <Button
                size="small"
                variant="contained"
                startIcon={<Plus size={14} />}
                onClick={() => setCreateTaskOpen(true)}
              >
                New task
              </Button>
              {isOwner && (
                <Tooltip title="Delete project">
                  <IconButton
                    size="small"
                    onClick={() => setDeleteOpen(true)}
                    sx={{ color: "#ef4444", border: "1px solid #fee2e2" }}
                  >
                    <Trash2 size={14} />
                  </IconButton>
                </Tooltip>
              )}
            </>
          )}
        </Box>
      </Box>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{ mb: 2.5, borderBottom: "1px solid #e2e8f0" }}
      >
        <Tab label="Board"   sx={{ fontSize: 13, fontWeight: 500, textTransform: "none" }} />
        <Tab label="List"    sx={{ fontSize: 13, fontWeight: 500, textTransform: "none" }} />
        <Tab label="Members" sx={{ fontSize: 13, fontWeight: 500, textTransform: "none" }} />
      </Tabs>

      {/* Board */}
      {tab === 0 && (
        loadingTasks ? (
          <Box sx={{ display: "flex", justifyContent: "center", pt: 6 }}>
            <CircularProgress size={28} />
          </Box>
        ) : tasks.length === 0 ? (
          <EmptyState
            title="No tasks"
            description="Create the first task for this project."
            actionLabel={canManage ? "New task" : undefined}
            onAction={canManage ? () => setCreateTaskOpen(true) : undefined}
          />
        ) : (
          <Board
            tasks={tasks}
            onTaskClick={canManage ? (t) => setEditTask(t) : undefined}
          />
        )
      )}

      {/* List */}
      {tab === 1 && (
        loadingTasks ? (
          <Box sx={{ display: "flex", justifyContent: "center", pt: 6 }}>
            <CircularProgress size={28} />
          </Box>
        ) : tasks.length === 0 ? (
          <EmptyState
            title="No tasks"
            actionLabel={canManage ? "New task" : undefined}
            onAction={canManage ? () => setCreateTaskOpen(true) : undefined}
          />
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {tasks.map((t) => (
              <TaskCard
                key={t.id}
                task={t}
                onClick={canManage ? () => setEditTask(t) : undefined}
              />
            ))}
          </Box>
        )
      )}

      {/* Members */}
      {tab === 2 && (
        loadingMembers ? (
          <Box sx={{ display: "flex", justifyContent: "center", pt: 6 }}>
            <CircularProgress size={28} />
          </Box>
        ) : members.length === 0 ? (
          <EmptyState
            title="No members"
            actionLabel={canManage ? "Add member" : undefined}
            onAction={canManage ? () => setAddMemberOpen(true) : undefined}
          />
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {members.map((m) => (
              <Box
                key={m.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 2,
                  bgcolor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: 2,
                }}
              >
                <Avatar sx={{ width: 34, height: 34, bgcolor: "#4f46e5", fontSize: 13 }}>
                  {m.user.name[0].toUpperCase()}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Box component="span" sx={{ display: "block", fontSize: 13.5, fontWeight: 500 }}>
                    {m.user.name}
                  </Box>
                  <Box component="span" sx={{ display: "block", fontSize: 12, color: "text.secondary" }}>
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
                    fontSize: "0.68rem",
                  }}
                />
                {canManage && m.userId !== user?.id && (
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveMember(m.id)}
                    disabled={removingMemberId === m.id}
                    sx={{ color: "#ef4444" }}
                  >
                    <Trash2 size={14} />
                  </IconButton>
                )}
              </Box>
            ))}
          </Box>
        )
      )}

      {/* Modals */}
      <CreateTask
        open={createTaskOpen}
        onClose={() => setCreateTaskOpen(false)}
        projectId={id}
        members={members}
      />
      {editTask && (
        <EditTask
          open={!!editTask}
          onClose={() => setEditTask(null)}
          task={editTask}
          members={members}
        />
      )}
      <AddMember
        open={addMemberOpen}
        onClose={() => setAddMemberOpen(false)}
        projectId={id}
      />
      <ConfirmDialog
        open={deleteOpen}
        title="Delete project"
        description={`Delete "${project.name}"? All tasks will be removed permanently.`}
        loading={deleting}
        onConfirm={handleDeleteProject}
        onClose={() => setDeleteOpen(false)}
      />
    </Box>
  );
}