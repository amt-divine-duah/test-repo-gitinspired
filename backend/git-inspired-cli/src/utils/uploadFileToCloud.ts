import * as fs from "fs";
import { Dropbox } from "dropbox";
import logger from "../configs/winstonConfig";
import { Octokit } from "@octokit/rest";
import axios from "axios";
import B2 = require("backblaze-b2");

export const uploadFileToDropbox = async (
  accessToken,
  filePath,
  destinationPath
) => {
  const dbx = new Dropbox({ accessToken });
  const fileContent = fs.readFileSync(filePath);

  try {
    const response = await dbx.filesUpload({
      path: destinationPath,
      contents: fileContent,
    });
  } catch (error) {
    logger.error("An error occurred while uploading the file", error);
  }
};

export const uploadFileToCloud = async (
  filePath: string,
  fileName: string,
) => {
  const fileContent = fs.readFileSync(filePath);
  try {
    const b2 = new B2({
      applicationKeyId: "005ff24cc418b510000000001",
      applicationKey: "K005g671gMA3oFiLPf4LHiVSkkhBk24",
    });
    await b2.authorize();
    const response = await b2.getUploadUrl({
      bucketId: "ff0f42344c4c4471888b0511",
    });
    await b2.uploadFile({
      uploadUrl: response.data.uploadUrl,
      uploadAuthToken: response.data.authorizationToken,
      fileName: fileName,
      data: fileContent, // this is expecting a Buffer, not an encoded string

      onUploadProgress: null,
    });
  } catch (error) {
    logger.error("Something went wrong");
  }
};
