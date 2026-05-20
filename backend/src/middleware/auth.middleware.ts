import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/jwt";
import { prisma } from "../lib/prisma";
import { AppError } from "../lib/errors";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = req.cookies?.token as string | undefined;

    if (!token) {
      throw new AppError("Not authenticated", 401);
    }

    const payload = verifyToken(token);

    const user = await prisma.user.findUnique({
      where:{ id: payload.userId },
      select:{ id:true, email:true, name:true }
    });

    if (!user) {
      throw new AppError("User not found", 401);
    }

    req.user = user;
    next();
  } catch (err) {
    if (err instanceof AppError) {
      next(err);
    } else {
      next(new AppError("Invalid or expired token", 401));
    }
  }
}