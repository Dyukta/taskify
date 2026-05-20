import { Request, Response } from "express";
import { asyncHandler } from "../lib/asyncHandler";
import { getDashboardStats } from "../services/dashboard.service";

export const getDashboard = asyncHandler(async (req: Request, res: Response) => {
  const stats = await getDashboardStats(req.user!.id);
  res.json({ success: true, data: stats });
});