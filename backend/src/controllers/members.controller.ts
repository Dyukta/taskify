import { Request, Response } from "express";
import { asyncHandler } from "../lib/asyncHandler";
import * as MemberService from "../services/members.service";
import { AddMemberInput, UpdateMemberInput } from "../schemas/member.schema";

export const getMembers = asyncHandler(async (req: Request, res: Response) => {
  const members = await MemberService.getProjectMembers(req.params["id"] as string);
  res.json({ success: true, data: members });
});

export const addMember = asyncHandler(async (req: Request, res: Response) => {
  const member = await MemberService.addProjectMember(
    req.params["id"] as string,
    req.body as AddMemberInput
  );
  res.status(201).json({ success: true, data: member });
});

export const updateMember = asyncHandler(async (req: Request, res: Response) => {
  const member = await MemberService.updateMemberRole(
    req.params["id"] as string,
    req.params["memberId"] as string,
    req.body as UpdateMemberInput
  );
  res.json({ success: true, data: member });
});

export const removeMember = asyncHandler(async (req: Request, res: Response) => {
  await MemberService.removeMember(
    req.params["id"] as string,
    req.params["memberId"] as string
  );
  res.status(204).send();
});