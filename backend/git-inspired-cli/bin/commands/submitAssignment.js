"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const path = require("path");
const fs = require("fs-extra");
const winstonConfig_1 = require("../configs/winstonConfig");
const submitAllSnapshots_1 = require("../utils/submitAllSnapshots");
const submitSpecificSnapshot_1 = require("../utils/submitSpecificSnapshot");
exports.command = "submit";
exports.desc = "Submit Assignment";
const builder = (yargs) => {
    // Add options specific to the "snap" command if needed
    return yargs.options({
        snapshot: {
            description: "Name of the snapshot to submit",
            type: "string",
            demandOption: false,
        },
    });
};
exports.builder = builder;
const handler = async (argv) => {
    // Check if init directory has been created
    const initDirectory = path.resolve(process.cwd(), ".subsys");
    if (!fs.existsSync(initDirectory)) {
        winstonConfig_1.default.warn(`Please initialize a directory using "subsys init" command and create snapshots`);
        return;
    }
    const { snapshot } = argv;
    if (!snapshot) {
        console.log("I have to submit all assignments");
        (0, submitAllSnapshots_1.submitAllSnapshots)();
    }
    else {
        console.log("Submit the specific snapshot");
        (0, submitSpecificSnapshot_1.submitSpecificSnapshot)(snapshot);
    }
};
exports.handler = handler;
//# sourceMappingURL=submitAssignment.js.map