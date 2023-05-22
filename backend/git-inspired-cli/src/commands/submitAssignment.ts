import * as path from "path";
import * as fs from "fs-extra"
import logger from "../configs/winstonConfig";
import { submitAllSnapshots } from "../utils/submitAllSnapshots";
import { submitSpecificSnapshot } from "../utils/submitSpecificSnapshot";
import { CommandBuilder } from "yargs";
import { prompt } from "enquirer";
import { submitAssignmentPrompt } from "../prompts/submitAssignmentPrompt";
import axios from "axios"
import ora from "ora";

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
    logger.warn(`Please initialize a directory using "subsys init" command and create snapshots`);
    return;
  }

  const { snapshot } = argv;
  let snapshotfiles;
  if (!snapshot) {
    snapshotfiles = await submitAllSnapshots();
  } else {
    snapshotfiles = await submitSpecificSnapshot(snapshot);
    if (snapshotfiles.length === 0) {
      logger.info("Snapshot name not found. Please check the name and try again")
      return
    }
  }

  const response = await prompt(submitAssignmentPrompt)
  console.log(response, "This is response")
  // Get the config details
  const configDetails = fs.readFileSync(path.resolve(process.cwd(), ".config"), "utf-8")
  const configObject = JSON.parse(configDetails)
  const formData = {...response, ...configObject, snapName: snapshotfiles}
  console.log(formData, "I have form details");

  try {
    const results = await axios.post(
      "http://localhost:3001/api/cli/submit-snap", formData
    );
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        logger.error("Invalid credentials")
        return
      }
      else {
        console.log(error, "This is another")
        logger.error(error.response?.data["message"]);
        return
      }
    }
    else {
      console.log(error)
      logger.error("Something went wrong. Try again")
      return
    }
  }
  
}