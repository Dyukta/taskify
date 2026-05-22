import { api } from "./client";
import { unwrap } from "./unwrap";
import { ApiResponse } from "../types/api";
import { DashboardStats } from "../types/dashboard";

export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    const res = await api.get<ApiResponse<DashboardStats>>("/dashboard");
    return unwrap(res.data);
  }
};