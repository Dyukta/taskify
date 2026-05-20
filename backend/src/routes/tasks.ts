import { Router } from "express";
import * as TaskController from "../controllers/tasks.controller";
import { authenticate } from "../middleware/auth.middleware";
import { requireProjectMember, requireProjectAdmin } from "../middleware/project.middleware";
import { validate } from "../middleware/validate.middleware";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema";

const router = Router();

router.use(authenticate);

router.get("/projects/:id/tasks", requireProjectMember, TaskController.getProjectTasks);
router.post(
  "/projects/:id/tasks",
  requireProjectAdmin,
  validate(createTaskSchema),
  TaskController.createTask
);

router.get("/tasks/:id", TaskController.getTask);
router.patch("/tasks/:id", validate(updateTaskSchema), TaskController.updateTask);
router.delete("/tasks/:id", TaskController.deleteTask);

export default router;