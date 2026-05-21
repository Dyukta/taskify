import { Box, Alert } from "@mui/material";
import { FolderKanban, CheckSquare, TrendingUp, AlertCircle } from "lucide-react";
import { useDashboard } from "../hooks/useDashboard";
import { StatCard } from "../components/ui/StatCard";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import type { PieLabelRenderProps } from "recharts";

const STATUS_COLORS: Record<string, string> = {
  TODO:        "#94a3b8",
  IN_PROGRESS: "#3b82f6",
  DONE:        "#22c55e",
};

const PRIORITY_COLORS: Record<string, string> = {
  LOW:    "#86efac",
  MEDIUM: "#fcd34d",
  HIGH:   "#f87171",
};

export default function Dashboard() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) {
    return (
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 2 }}>
        {[...Array(4)].map((_, i) => (
          <Box
            key={i}
            sx={{ height: 90, bgcolor: "#e2e8f0", borderRadius: 2, animation: "pulse 1.5s infinite" }}
          />
        ))}
      </Box>
    );
  }

  if (isError) {
    return <Alert severity="error">Failed to load dashboard. Please try again.</Alert>;
  }

  const statusData = (data?.tasksByStatus ?? []).map((s) => ({
    name: s.status.replace("_", " "),
    value: s.count,
    fill: STATUS_COLORS[s.status] ?? "#94a3b8",
  }));

  const priorityData = (data?.tasksByPriority ?? []).map((p) => ({
    name: p.priority,
    count: p.count,
    fill: PRIORITY_COLORS[p.priority] ?? "#94a3b8",
  }));

  const completionRate =
    data && data.totalTasks > 0
      ? Math.round((data.completedTasks / data.totalTasks) * 100)
      : 0;

  return (
    <Box>
      <Box component="span" sx={{ display: "block", fontWeight: 700, fontSize: 20, mb: 3 }}>
        Overview
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 2,
          mb: 4,
        }}
      >
        <StatCard title="Projects"    value={data?.totalProjects  ?? 0} icon={<FolderKanban size={20} />} color="#4f46e5" />
        <StatCard title="Total Tasks" value={data?.totalTasks     ?? 0} icon={<CheckSquare  size={20} />} color="#3b82f6" />
        <StatCard title="Completed"   value={data?.completedTasks ?? 0} icon={<TrendingUp   size={20} />} color="#22c55e" />
        <StatCard title="Overdue"     value={data?.overdueTasks   ?? 0} icon={<AlertCircle  size={20} />} color="#ef4444" />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        {statusData.length > 0 && (
          <Box
            sx={{
              bgcolor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: 2.5,
              p: 3,
            }}
          >
            <Box component="span" sx={{ display: "block", fontWeight: 600, fontSize: 14, mb: 2.5 }}>
              Tasks by status
            </Box>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={statusData} barSize={28}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {statusData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )}

        {priorityData.length > 0 && (
          <Box
            sx={{
              bgcolor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: 2.5,
              p: 3,
            }}
          >
            <Box component="span" sx={{ display: "block", fontWeight: 600, fontSize: 14, mb: 2.5 }}>
              Tasks by priority
            </Box>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={priorityData}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label={(props: PieLabelRenderProps) => {
  const name = props.name ?? "";
  const percent = props.percent ?? 0;

  return `${name} ${Math.round(percent * 100)}%`;
}}
                  labelLine={false}
                  fontSize={11}
                >
                  {priorityData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        )}
      </Box>

      {data && data.totalTasks > 0 && (
        <Box
          sx={{
            mt: 3,
            bgcolor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: 2.5,
            p: 3,
          }}
        >
          <Box component="span" sx={{ display: "block", fontWeight: 600, fontSize: 14, mb: 1 }}>
            Completion rate
          </Box>
          <Box
            sx={{
              bgcolor: "#f1f5f9",
              borderRadius: 99,
              height: 8,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: `${completionRate}%`,
                height: "100%",
                bgcolor: "#22c55e",
                borderRadius: 99,
                transition: "width 0.5s ease",
              }}
            />
          </Box>
          <Box
            component="span"
            sx={{ display: "block", fontSize: 12, color: "text.secondary", mt: 0.8 }}
          >
            {completionRate}% of tasks completed
          </Box>
        </Box>
      )}
    </Box>
  );
}