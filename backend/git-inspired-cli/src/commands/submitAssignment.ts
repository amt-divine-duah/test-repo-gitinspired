import * as path from "path";
import * as fs from "fs-extra";
import logger from "../configs/winstonConfig";
import { submitAllSnapshots } from "../utils/submitAllSnapshots";
import { submitSpecificSnapshot } from "../utils/submitSpecificSnapshot";
import { CommandBuilder } from "yargs";
import { prompt } from "enquirer";
import { submitAssignmentPrompt } from "../prompts/submitAssignmentPrompt";
import axios from "axios";
import ora from "ora";
import { uploadFileToDropbox } from "../utils/uploadFileToDropbox";

export const command: string = "submit";
export const desc: string = "Submit Assignment";

export const builder: CommandBuilder = (yargs) => {
  // Add options specific to the "snap" command if needed
  return yargs.options({
    snapshot: {
      description: "Name of the snapshot to submit",
      type: "string",
      demandOption: false,
    },
  });
};

export const handler = async (argv) => {
  // Check if init directory has been created
  const initDirectory = path.resolve(process.cwd(), ".subsys");
  if (!fs.existsSync(initDirectory)) {
    logger.warn(
      `Please initialize a directory using "subsys init" command and create snapshots`
    );
    return;
  }

  const { snapshot } = argv;
  let snapshotfiles;
  if (!snapshot) {
    snapshotfiles = await submitAllSnapshots();
    if (snapshotfiles.length === 0) {
      logger.info(
        "there is nothing to submit. please add files and try again."
      );
      return;
    }
  } else {
    snapshotfiles = await submitSpecificSnapshot(snapshot);
    if (snapshotfiles.length === 0) {
      logger.info(
        "Snapshot name not found. Please check the name and try again."
      );
      return;
    }
  }

  const response = await prompt(submitAssignmentPrompt);
  // Get the config details
  const configDetails = fs.readFileSync(
    path.resolve(process.cwd(), ".config"),
    "utf-8"
  );
  const configObject = JSON.parse(configDetails);
  const formData = { ...response, ...configObject, snapName: snapshotfiles };
  try {
    const results = await axios.post(
      "http://localhost:3001/api/cli/submit-snap",
      formData
    );

    if (results.status === 200) {
      // Upload the zip files to Dropbox
      const dropboxAccessToken =
        "sl.Be1ccRmPYyZRonSgZXSw8q38WsPMHx_BN7knZlwV36AKe6vMELdoTGHahz5QZZtIssjdTXG7bqztqjaxfnq2yLJc_R87xb_iyWeS6S_FmZ4TM1LUZ6StLxIQndCxBpxc-VlmKTVX";
      const destinationFolderPath = "/git-inspired/";

      for (const file of snapshotfiles) {
        const filePath = path.resolve(process.cwd(), ".subsys", file);
        const destinationPath = destinationFolderPath + path.basename(filePath);
        await uploadFileToDropbox(
          dropboxAccessToken,
          filePath,
          destinationPath
        );
      }
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        logger.error("Invalid credentials");
        return;
      } else {
        logger.error(error.response?.data["message"]);
        return;
      }
    } else {
      console.log(error);
      logger.error("Something went wrong. Try again");
      return;
    }
  }
};
