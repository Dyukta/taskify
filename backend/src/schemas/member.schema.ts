import { z } from "zod";

const RoleEnum = z.enum(["ADMIN", "MEMBER"]);

export const addMemberSchema = z.object({
  body: z.object({
    email: z.string().email("Valid email is required"),
    role: RoleEnum.optional().default("MEMBER")
  })
});

export const updateMemberSchema = z.object({
  body: z.object({
    role: RoleEnum
  })
});

export type AddMemberInput = z.infer<typeof addMemberSchema>["body"];
export type UpdateMemberInput = z.infer<typeof updateMemberSchema>["body"];