import { prisma } from "../lib/prisma";
import { AppError } from "../lib/errors";
import { AddMemberInput, UpdateMemberInput } from "../schemas/member.schema";

const USER_SELECT = { id: true, name: true, email: true };

export async function getProjectMembers(projectId: string) {
  return prisma.projectMember.findMany({
    where: { projectId },
    include: { user: { select: USER_SELECT } },
    orderBy: { joinedAt: "asc" }
  });
}

export async function addProjectMember(projectId: string, data: AddMemberInput) {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) throw new AppError("User with this email not found", 404);

  const existing = await prisma.projectMember.findUnique({
    where: { projectId_userId: { projectId, userId: user.id } }
  });
  if (existing) throw new AppError("User is already a member of this project", 409);

  return prisma.projectMember.create({
    data: { projectId, userId: user.id, role: data.role },
    include: { user: { select: USER_SELECT } }
  });
}

export async function updateMemberRole(
  projectId: string,
  memberId: string,
  data: UpdateMemberInput
) {
  const member = await prisma.projectMember.findUnique({
    where: { id: memberId, projectId }
  });
  if (!member) throw new AppError("Member not found", 404);

  if (member.role === "ADMIN" && data.role === "MEMBER") {
    const adminCount = await prisma.projectMember.count({
      where: { projectId, role: "ADMIN" }
    });
    if (adminCount <= 1) throw new AppError("Cannot demote the last admin", 400);
  }

  return prisma.projectMember.update({
    where: { id: memberId },
    data: { role: data.role },
    include: { user: { select: USER_SELECT } }
  });
}

export async function removeMember(projectId: string, memberId: string) {
  const member = await prisma.projectMember.findUnique({
    where: { id: memberId, projectId }
  });
  if (!member) throw new AppError("Member not found", 404);

  if (member.role === "ADMIN") {
    const adminCount = await prisma.projectMember.count({
      where: { projectId, role: "ADMIN" }
    });
    if (adminCount <= 1) throw new AppError("Cannot remove the last admin", 400);
  }

  await prisma.projectMember.delete({ where: { id: memberId } });
}