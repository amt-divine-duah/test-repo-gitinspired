import { hash } from "bcryptjs";
import { prisma } from "../configs/prismaConfig";

export const resetDb = async () => {
  const res = await prisma.$transaction([
    prisma.otp.deleteMany(),
    prisma.user.deleteMany(),
    prisma.lecturer.deleteMany(),
    prisma.student.deleteMany(),
  ]);
};

export const userPayload = {
  email: "yxlsiyqbqnkc@internetkeno.com",
  firstname: "Divine",
  lastname: "Duah",
};
