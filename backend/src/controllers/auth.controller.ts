import { Request, Response } from "express";
import { asyncHandler } from "../lib/asyncHandler";
import { signToken } from "../lib/jwt";
import { setAuthCookie, clearAuthCookie } from "../lib/cookies";
import * as AuthService from "../services/auth.service";
import { RegisterInput, LoginInput } from "../schemas/auth.schema";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const user = await AuthService.registerUser(req.body as RegisterInput);
  const token = signToken(user.id);
  setAuthCookie(res, token);
  res.status(201).json({ success: true, data: user });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const user = await AuthService.loginUser(req.body as LoginInput);
  const token = signToken(user.id);
  setAuthCookie(res, token);
  res.status(200).json({ success: true, data: user });
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  clearAuthCookie(res);
  res.status(200).json({ success: true, data: null });
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  const user = await AuthService.getUserById(req.user!.id);
  res.status(200).json({ success: true, data: user });
});