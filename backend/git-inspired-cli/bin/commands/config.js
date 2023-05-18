"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const enquirer_1 = require("enquirer");
const configQuestions_1 = require("../prompts/configQuestions");
const configDir_1 = require("../utils/configDir");
exports.command = "config";
exports.desc = "Configure the repository to an existing assignment";
const builder = (yargs) => {
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
            throw new Error("Please provide --uniqueCode [assignment code] and --studentId [student id]");
        }
        else
            return true;
    });
};
exports.builder = builder;
const handler = async (argv) => {
    const { uniqueCode, studentId, i } = argv;
    if (i && (!uniqueCode || !studentId)) {
        const response = await (0, enquirer_1.prompt)(configQuestions_1.configQuestions);
        (0, configDir_1.configDirectory)(response);
    }
    else if (uniqueCode && studentId) {
        (0, configDir_1.configDirectory)({ uniqueCode, studentId });
    }
};
exports.handler = handler;
//# sourceMappingURL=config.js.map