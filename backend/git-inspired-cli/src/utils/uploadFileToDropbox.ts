import * as fs from "fs"
import {Dropbox} from "dropbox"
import logger from "../configs/winstonConfig";

export const uploadFileToDropbox = async (accessToken, filePath, destinationPath) => {
  const dbx = new Dropbox({ accessToken });
  const fileContent = fs.readFileSync(filePath);

  try {
    const response = await dbx.filesUpload({
      path: destinationPath,
      contents: fileContent,
    });
  } catch (error) {
    logger.error(
      "An error occurred while uploading the file",
      error
    );
  }
}
