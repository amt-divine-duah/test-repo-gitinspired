"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitAllSnapshots = void 0;
const fg = require("fast-glob");
const path = require("path");
const submitAllSnapshots = async () => {
    const snapshotFiles = await fg("*.zip", {
        cwd: path.resolve(process.cwd(), ".subsys"),
        dot: true,
        onlyFiles: true,
        deep: 0,
        ignore: ["node_modules/**", ".subsys/**", ".config"],
    });
    // console.log("I have to submit all snapshots", snapshotFiles)
    return snapshotFiles;
};
exports.submitAllSnapshots = submitAllSnapshots;
//# sourceMappingURL=submitAllSnapshots.js.map