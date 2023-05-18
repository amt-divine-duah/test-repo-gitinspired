import * as fs from "fs-extra";
import * as hidefile from "hidefile";
import * as path from "path";
import logger from "../configs/winstonConfig";
import { FOLDERNAME } from "../constants/constants";

export const initializeFolder = async () => {
  const folderName = FOLDERNAME.NAME;
  const folderPath = path.resolve(process.cwd(), folderName);
  logger.info(folderPath);

  try {
    const folderExists = await fs.pathExists(folderPath);
    if (folderExists) {
      logger.info("Folder already initialized");
    } else {
      fs.mkdirSync(folderPath);
      hidefile.hideSync(folderPath);
      logger.info(`Folder ${folderName} initialized`);
    }
  } catch (error) {
    logger.error("Error initializing folder", error);
  }
};
