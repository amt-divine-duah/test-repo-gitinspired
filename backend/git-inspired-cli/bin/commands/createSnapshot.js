"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const createSnapShotUtil_1 = require("../utils/createSnapShotUtil");
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
const handler = async () => {
    await (0, createSnapShotUtil_1.createSnapShot)();
};
exports.handler = handler;
//# sourceMappingURL=createSnapshot.js.map