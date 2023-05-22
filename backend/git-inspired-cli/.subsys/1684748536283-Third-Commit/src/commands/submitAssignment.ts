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
    console.log("I have to submit all assignments");
    snapshotfiles = await submitAllSnapshots();
  } else {
    console.log("Submit the specific snapshot");
    submitSpecificSnapshot(snapshot);
  }

  const response = await prompt(submitAssignmentPrompt)
  console.log(response, "This is response")
  // Get the config details
  const configDetails = fs.readFileSync(path.resolve(process.cwd(), ".config"), "utf-8")
  const configObject = JSON.parse(configDetails)
  const formData = {...response, ...configObject, snapName: snapshotfiles}
  console.log(formData, "I have form details");

  // try {
  //   const results = await axios.post(
  //     "http://localhost:3001/api/cli/submit-snap", formData
  //   );
  //   console.log(results, "I have results")
    
  // } catch (error) {
  //   if (axios.isAxiosError(error)) {
  //     if (error.response?.status === 404) {
  //       logger.error("Invalid credentials")
  //       return
  //     }
  //     else {
  //       console.log(error, "This is another")
  //       logger.error(error.response?.data["message"]);
  //       return
  //     }
  //   }
  //   else {
  //     console.log(error)
  //     logger.error("Something went wrong. Try again")
  //     return
  //   }
  // }
  
}