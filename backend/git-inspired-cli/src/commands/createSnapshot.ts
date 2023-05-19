import slugify from "slugify";
import { createSnapShot } from "../utils/createSnapShotUtil";
import { CommandBuilder } from "yargs";
import { prompt } from "enquirer"
import { snapshotQuestion } from "../prompts/snapshotPrompt";

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
    await createSnapShot(slugify(snapshotName));
  } else {
    // The name is provided as a command-line argument
    await createSnapShot(slugify(name));
  }
};
