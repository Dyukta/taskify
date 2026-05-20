import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { AppError } from "../lib/errors";
import { RegisterInput, LoginInput } from "../schemas/auth.schema";

const USER_SELECT = {
  id: true,
  name: true,
  email: true,
  createdAt: true,
  updatedAt: true
} as const;

export async function registerUser(data: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) throw new AppError("Email already in use", 409);

  const hashed = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: { name: data.name, email: data.email, password: hashed },
    select: USER_SELECT
  });

  return user;
}

export async function loginUser(data: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) throw new AppError("Invalid credentials", 401);

  const valid = await bcrypt.compare(data.password, user.password);
  if (!valid) throw new AppError("Invalid credentials", 401);

  const { password: _, ...safeUser } = user;
  return safeUser;
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: USER_SELECT
  });
  if (!user) throw new AppError("User not found", 404);
  return user;
}