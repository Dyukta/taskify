import { api } from "./client";
import { unwrap } from "./unwrap";
import { ApiResponse } from "../types/api";
import { User } from "../types/user";

export const authApi = {
  me: async (): Promise<User> => {
    const res = await api.get<ApiResponse<User>>("/auth/me");
    return unwrap(res.data);
  },

  login: async (data: { email: string; password: string }): Promise<User> => {
    const res = await api.post<ApiResponse<User>>("/auth/login", data);
    return unwrap(res.data);
  },

  register: async (data: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> => {
    const res = await api.post<ApiResponse<User>>("/auth/register", data);
    return unwrap(res.data);
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  }
};