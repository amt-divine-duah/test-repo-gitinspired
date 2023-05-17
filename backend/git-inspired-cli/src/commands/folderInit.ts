import { initializeFolder } from "../utils/folderInitUtil";
import { CommandBuilder } from "yargs";


export const command: string = "init";
export const desc: string = "Initialize a directory";

export const builder: CommandBuilder = (yargs) => {
  // Add options specific to the "add" command if needed
  return yargs;
};

export const handler = async () => {
  await initializeFolder();
};