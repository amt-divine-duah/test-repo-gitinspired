import { PrismaClient } from "@prisma/client";
import { customAlphabet } from "nanoid";
import logger from "../src/configs/winstonConfig";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();
const password = "Admin@123";
let staffId: string;

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 8);
staffId = "ADM-" + nanoid();

(async () => {
  const admin = await prisma.user.create({
    data: {
      email: "hethere97@gmail.com",
      password: await hash(password, 12),
      loginId: staffId,
      role: "ADMIN",
      isActive: true,
    },
  });
  logger.info("Admin created successfully");
})()
  .then(async () => {
    logger.info("Disconnecting client");
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    logger.error(`something occured ${err}`);
    await prisma.$disconnect();
  });
