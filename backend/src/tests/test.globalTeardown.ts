import { prisma } from "../configs/prismaConfig"
import { resetDb } from "./testHelper"

module.exports = async () => {
    await resetDb()
    await prisma.$disconnect()
}