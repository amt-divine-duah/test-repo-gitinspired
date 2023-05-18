import * as path from "path"
import * as fs from "fs-extra"
import * as hidefile from "hidefile"
import { FOLDERNAME } from "../constants/constants"
import logger from "../configs/winstonConfig"


export const initializeFolder = async () => {

    const folderName = FOLDERNAME.NAME
    const folderPath = path.resolve(process.cwd(), folderName);

    try {   
        const folderExists = await fs.pathExists(folderPath)
        if (folderExists) {
            logger.info("Folder already initialized")
        }
        else {
            fs.mkdirSync(folderPath)
            hidefile.hideSync(folderPath)
            logger.info(`Folder ${folderName} initialized`)
            
        }
    } catch (error) {
        logger.error("Error initializing folder", error)
    }

}