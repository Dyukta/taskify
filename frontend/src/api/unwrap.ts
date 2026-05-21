import { ApiResponse } from "../types/api";

export function unwrap<T>(response: ApiResponse<T>): T {
  if (!response.success) {
    throw new Error(response.message || "Request failed");
  }
  return response.data;
}