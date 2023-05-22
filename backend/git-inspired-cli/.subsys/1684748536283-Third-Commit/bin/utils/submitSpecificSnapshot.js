"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitSpecificSnapshot = void 0;
const path = require("path");
const fg = require("fast-glob");
const submitSpecificSnapshot = async (snapshot) => {
    console.log("I submit specific snapshot here", snapshot);
    const snapshotFiles = await fg("*.zip", {
        cwd: path.resolve(process.cwd(), ".subsys"),
        dot: true,
        onlyFiles: true,
        deep: 0,
        ignore: ["node_modules/**", ".subsys/**", ".config"],
    });
    console.log(snapshotFiles);
};
exports.submitSpecificSnapshot = submitSpecificSnapshot;
//# sourceMappingURL=submitSpecificSnapshot.js.map