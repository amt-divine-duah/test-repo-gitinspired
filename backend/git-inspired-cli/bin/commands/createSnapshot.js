"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const slugify_1 = require("slugify");
const createSnapShotUtil_1 = require("../utils/createSnapShotUtil");
const enquirer_1 = require("enquirer");
const snapshotPrompt_1 = require("../prompts/snapshotPrompt");
const winstonConfig_1 = require("../configs/winstonConfig");
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
        const slug = (0, slugify_1.default)(snapshotName, {
            lower: true
        });
        if (slug === snapshotName) {
            await (0, createSnapShotUtil_1.createSnapShot)(slug);
        }
        else {
            winstonConfig_1.default.warn("Snapshot name must be a slug");
            return;
        }
    }
    // Name is provided as a command line argument
    else {
        const slug = (0, slugify_1.default)(name, {
            lower: true
        });
        if (slug === name) {
            await (0, createSnapShotUtil_1.createSnapShot)(slug);
        }
        else {
            winstonConfig_1.default.warn("Snapshot name must be a slug");
            return;
        }
    }
};
exports.handler = handler;
//# sourceMappingURL=createSnapshot.js.map