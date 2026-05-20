import { Router } from "express";
import * as AuthController from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { registerSchema, loginSchema } from "../schemas/auth.schema";

const router = Router();

router.post("/register", validate(registerSchema), AuthController.register);
router.post("/login", validate(loginSchema), AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/me", authenticate, AuthController.me);

export default router;