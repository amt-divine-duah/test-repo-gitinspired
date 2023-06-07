import { hash } from "bcryptjs";
import { prisma } from "../configs/prismaConfig";
import logger from "../configs/winstonConfig";
import { resetDb } from "./testHelper";


process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
process.env.NODE_ENV="testing"

module.exports = async () => {
  prisma.$connect().then(async () => {
    logger.info("Database has been connected")
    await resetDb()
    await prisma.user.create({
      data: {
        email: "admin@gmail.com",
        password: await hash("Admin@123", 12),
        loginId: "ADM-PJT1TQ0H",
        role: "ADMIN",
        isActive: true,
      },
    });
  }).catch((err) => {
    logger.info("Could not connect", err)
  })
};
