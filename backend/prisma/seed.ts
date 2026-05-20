import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding");

  await prisma.task.deleteMany();
  await prisma.projectMember.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  const adminPassword = await bcrypt.hash("admin", 10);
  const memberPassword = await bcrypt.hash("member", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Raghav",
      email: "admin@example.com",
      password: adminPassword,
    },
  });

  const member = await prisma.user.create({
    data: {
      name: "Yukta",
      email: "member@example.com",
      password: memberPassword,
    },
  });

  const project = await prisma.project.create({
    data: {
      name: "Product Launch Campaign",
      description:
        "Managing marketing and development tasks for a new product launch",
      createdById: admin.id,
      members: {
        create: [
          {
            userId: admin.id,
            role: "ADMIN",
          },
          {
            userId: member.id,
            role: "MEMBER",
          }
        ]
      }
    }
  });

  await prisma.task.createMany({
    data: [
      {
        title: "Prepare Social Media Posts",
        description:
          "schedule promotional posts for socials",
        status: "DONE",
        priority: "HIGH",
        projectId: project.id,
        assigneeId: admin.id,
        createdById: admin.id,
      },
      {
        title: "Develop Landing Page",
        description:
          "Build a responsive landing page",
        status: "IN_PROGRESS",
        priority: "HIGH",
        projectId: project.id,
        assigneeId: member.id,
        createdById: admin.id,
        dueDate: new Date("2026-5-20"),
      }
    ],
  });

  console.log(
    "completed"
  );
}

main()
  .catch((error) => {
    console.error("seeding failed");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });