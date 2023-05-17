import { createSnapShot } from "../utils/createSnapShotUtil";
import { CommandBuilder } from "yargs";

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

export const handler = async () => {
    
  await createSnapShot();
};
