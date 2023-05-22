"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitSpecificSnapshot = void 0;
const path = require("path");
const fg = require("fast-glob");
const _ = require("lodash");
const submitSpecificSnapshot = async (snapshotName) => {
    let snapshotFiles = [];
    const allSnapshotFiles = await fg("*.zip", {
        cwd: path.resolve(process.cwd(), ".subsys"),
        dot: true,
        onlyFiles: true,
        deep: 0,
        ignore: ["node_modules/**", ".subsys/**", ".config"],
    });
    for (const file of allSnapshotFiles) {
        // Get the filename, without the extension
        const filename = path.basename(file, path.extname(file));
        const unslugifiedName = _.join(filename.split("-").slice(1), " ");
        if (snapshotName === unslugifiedName) {
            snapshotFiles.push(file);
        }
    }
    return snapshotFiles;
};
exports.submitSpecificSnapshot = submitSpecificSnapshot;
//# sourceMappingURL=submitSpecificSnapshot.js.map