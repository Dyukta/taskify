import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query
    });

    if (!result.success) {
      const errors: Record<string, string[]> = {};

      for (const issue of result.error.issues) {
        const key = issue.path.slice(1).join(".") || issue.path.join(".");
        if (!errors[key]) errors[key] = [];
        errors[key].push(issue.message);
      }

      res.status(422).json({
        success: false,
        message: "Validation failed",
        errors
      });
      return;
    }

    next();
  };
}