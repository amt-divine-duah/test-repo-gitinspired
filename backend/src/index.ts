import configureApp from "./app";
import configValues from "./configs/config";
import { prisma } from "./configs/prismaConfig";
import logger from "./configs/winstonConfig";
import { task } from './utils/scheduler';

const PORT = configValues.APP_PORT

prisma.$connect().then(() => {
    logger.info("Database connected successfully")
}).catch((err: any) => {
    logger.error(err)
})

const app = configureApp()
task.start();
app.listen(PORT, () => {
    logger.info(`Server is running on ${PORT}`)
})
