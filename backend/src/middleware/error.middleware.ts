import { Request, Response, NextFunction } from "express";
import { AppError } from "../lib/errors";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ success: false, message: err.message });
    return;
  }

  if (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    "clientVersion" in err
  ) {
    const prismaErr = err as { code: string };
    if (prismaErr.code === "P2002") {
      res.status(409).json({ success: false, message: "Resource already exists" });
      return;
    }
    if (prismaErr.code === "P2025") {
      res.status(404).json({ success: false, message: "Resource not found" });
      return;
    }
  }

  console.error("[Unhandled Error]", err);
  res.status(500).json({ success: false, message: "Internal server error" });
}