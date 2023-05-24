import slugify from "slugify";
import { createSnapShot } from "../utils/createSnapShotUtil";
import { CommandBuilder } from "yargs";
import { prompt } from "enquirer"
import { snapshotQuestion } from "../prompts/snapshotPrompt";
import logger from "../configs/winstonConfig";

export const command: string = "snap";
export const desc: string = "Create assigment snapshot";

export const builder: CommandBuilder = (yargs) => {
  // Add options specific to the "snap" command if needed
  return yargs.options({
    name: {
      alias: "n",
      description: "Name of the snapshot",
      type: "string",
      demandOption: false,
    },
  });

};

export const handler = async (argv) => {
    const {name} = argv
     if (!name) {
    // Prompt the user for the name if it's not provided
    const response = await prompt(snapshotQuestion);

    // Retrieve the name from the user's response
    const snapshotName = response["name"];

    // Use the snapshotName for further processing
    const slug = slugify(snapshotName, {
      lower: true
    })
    if (slug === snapshotName) {
      await createSnapShot(slug);
    }
    else {
      logger.warn("Snapshot name must be a slug")
      return
    }
  } 
  // Name is provided as a command line argument
  else {
    const slug = slugify(name, { 
      lower: true
    });
    if (slug === name) {
      await createSnapShot(slug);
    }
    else {
      logger.warn("Snapshot name must be a slug");
      return;
    }
  }
};
