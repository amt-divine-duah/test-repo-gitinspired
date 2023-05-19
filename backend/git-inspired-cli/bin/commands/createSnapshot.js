"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const slugify_1 = require("slugify");
const createSnapShotUtil_1 = require("../utils/createSnapShotUtil");
const enquirer_1 = require("enquirer");
const snapshotPrompt_1 = require("../prompts/snapshotPrompt");
exports.command = "snap";
exports.desc = "Create assigment snapshot";
const builder = (yargs) => {
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
exports.builder = builder;
const handler = async (argv) => {
    const { name } = argv;
    if (!name) {
        // Prompt the user for the name if it's not provided
        const response = await (0, enquirer_1.prompt)(snapshotPrompt_1.snapshotQuestion);
        // Retrieve the name from the user's response
        const snapshotName = response["name"];
        // Use the snapshotName for further processing
        await (0, createSnapShotUtil_1.createSnapShot)((0, slugify_1.default)(snapshotName));
    }
    else {
        // The name is provided as a command-line argument
        await (0, createSnapShotUtil_1.createSnapShot)((0, slugify_1.default)(name));
    }
};
exports.handler = handler;
//# sourceMappingURL=createSnapshot.js.map