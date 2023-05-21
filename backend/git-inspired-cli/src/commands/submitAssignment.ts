import * as path from "path";
import * as fs from "fs-extra"
import logger from "../configs/winstonConfig";
import { submitAllSnapshots } from "../utils/submitAllSnapshots";
import { submitSpecificSnapshot } from "../utils/submitSpecificSnapshot";
import { CommandBuilder } from "yargs";

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

  if (!snapshot) {
    console.log("I have to submit all assignments");
    submitAllSnapshots();
  } else {
    console.log("Submit the specific snapshot");
    submitSpecificSnapshot(snapshot);
  }
}