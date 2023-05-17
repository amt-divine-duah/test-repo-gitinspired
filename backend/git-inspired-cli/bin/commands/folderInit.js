"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const folderInitUtil_1 = require("../utils/folderInitUtil");
exports.command = "init";
exports.desc = "Initialize a directory";
const builder = (yargs) => {
    // Add options specific to the "add" command if needed
    return yargs;
};
exports.builder = builder;
const handler = async () => {
    await (0, folderInitUtil_1.initializeFolder)();
};
exports.handler = handler;
//# sourceMappingURL=folderInit.js.map