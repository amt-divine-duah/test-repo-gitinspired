"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const path = require("path");
const fs = require("fs-extra");
const winstonConfig_1 = require("../configs/winstonConfig");
const submitAllSnapshots_1 = require("../utils/submitAllSnapshots");
const submitSpecificSnapshot_1 = require("../utils/submitSpecificSnapshot");
const enquirer_1 = require("enquirer");
const submitAssignmentPrompt_1 = require("../prompts/submitAssignmentPrompt");
const axios_1 = require("axios");
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
    var _a, _b;
    // Check if init directory has been created
    const initDirectory = path.resolve(process.cwd(), ".subsys");
    if (!fs.existsSync(initDirectory)) {
        winstonConfig_1.default.warn(`Please initialize a directory using "subsys init" command and create snapshots`);
        return;
    }
    const { snapshot } = argv;
    let snapshotfiles;
    if (!snapshot) {
        console.log("I have to submit all assignments");
        (0, submitAllSnapshots_1.submitAllSnapshots)();
    }
    else {
        console.log("Submit the specific snapshot");
        (0, submitSpecificSnapshot_1.submitSpecificSnapshot)(snapshot);
    }
    const response = await (0, enquirer_1.prompt)(submitAssignmentPrompt_1.submitAssignmentPrompt);
    console.log(response, "This is response");
    // Get the config details
    const configDetails = fs.readFileSync(path.resolve(process.cwd(), ".config"), "utf-8");
    const configObject = JSON.parse(configDetails);
    const formData = Object.assign(Object.assign({}, response), configObject);
    console.log(formData, "I have form details");
    try {
        const results = await axios_1.default.post("http://localhost:3001/api/cli/submit-snap", formData);
        console.log(results, "I have results");
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 404) {
                winstonConfig_1.default.error("Invalid credentials");
                return;
            }
            else {
                console.log(error, "This is another");
                winstonConfig_1.default.error((_b = error.response) === null || _b === void 0 ? void 0 : _b.data["message"]);
                return;
            }
        }
        else {
            console.log(error);
            winstonConfig_1.default.error("Something went wrong. Try again");
            return;
        }
    }
};
exports.handler = handler;
//# sourceMappingURL=submitAssignment.js.map