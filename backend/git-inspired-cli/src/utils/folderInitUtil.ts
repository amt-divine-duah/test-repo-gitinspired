import * as path from "path"
import * as fs from "fs-extra"
import * as appRoot from "app-root-path"
import * as hidefile from "hidefile"
import { FOLDERNAME } from "../constants/constants"
import logger from "../configs/winstonConfig"


export const initializeFolder = async () => {

    const rootPath = appRoot.path
    const folderName = FOLDERNAME.NAME
    const folderPath = path.resolve(rootPath, folderName)

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