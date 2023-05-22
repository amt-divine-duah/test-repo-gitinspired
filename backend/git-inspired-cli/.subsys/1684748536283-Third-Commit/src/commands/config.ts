import { Arguments, argv, CommandBuilder } from "yargs";
import { prompt } from "enquirer";
import { configQuestions } from "../prompts/configQuestions";
import { configDirectory } from "../utils/configDirectory";

type Options = {
  uniqueCode: string;
  studentId: string;
  i: boolean | undefined;
};

export const command = "config";
export const desc = "Configure the repository to an existing assignment";

export const builder: CommandBuilder<Options, Options> = (yargs) => {
  return yargs
    .option("i", {
      describe: "Interactive configuration of repository",
      type: "boolean",
      demandOption: false,
    })
    .option("uniqueCode", {
      describe: "The unique code for the assignment ",
      type: "string",
      demandOption: false,
    })
    .option("studentId", {
      describe: "The student ID to be associated with the assignment",
      type: "string",
      demandOption: false,
    })
    .check((argv) => {
      if (!argv.i && (!argv.studentId || !argv.uniqueCode)) {
        throw new Error(
          "Please provide --uniqueCode [assignment code] and --studentId [student id]"
        );
      } else return true;
    });
};
export const handler = async (argv: Arguments<Options>) => {
  const { uniqueCode, studentId, i } = argv;
  if (i && (!uniqueCode || !studentId)) {
    const response = await prompt(configQuestions);
    configDirectory(response);
  } else if (uniqueCode && studentId) {
    configDirectory({uniqueCode, studentId});
  }
};
