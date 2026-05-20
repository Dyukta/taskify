import { Router } from "express";
import * as ProjectController from "../controllers/projects.controller";
import * as MemberController from "../controllers/members.controller";
import { authenticate } from "../middleware/auth.middleware";
import { requireProjectAdmin, requireProjectMember } from "../middleware/project.middleware";
import { validate } from "../middleware/validate.middleware";
import { createProjectSchema, updateProjectSchema } from "../schemas/project.schema";
import { addMemberSchema, updateMemberSchema } from "../schemas/member.schema";

const router = Router();

router.use(authenticate);

router.get("/", ProjectController.getProjects);
router.post("/", validate(createProjectSchema), ProjectController.createProject);
router.get("/:id", requireProjectMember, ProjectController.getProject);
router.patch("/:id", requireProjectAdmin, validate(updateProjectSchema), ProjectController.updateProject);
router.delete("/:id", requireProjectAdmin, ProjectController.deleteProject);

router.get("/:id/members", requireProjectMember, MemberController.getMembers);
router.post("/:id/members", requireProjectAdmin, validate(addMemberSchema), MemberController.addMember);
router.patch("/:id/members/:memberId", requireProjectAdmin, validate(updateMemberSchema), MemberController.updateMember);
router.delete("/:id/members/:memberId", requireProjectAdmin, MemberController.removeMember);

export default router;