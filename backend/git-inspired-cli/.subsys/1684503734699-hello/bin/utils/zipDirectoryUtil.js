"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zipDirectoryUtil = void 0;
const archiver = require("archiver");
const fs = require("fs-extra");
const path = require("path");
const zipDirectoryUtil = async (snapshotName, snapshotPath) => {
    // Create a zip file of the snapshot directory
    const zipFileName = `${snapshotName}.zip`;
    const zipFilePath = path.resolve(process.cwd(), ".subsys", zipFileName);
    const outputZip = fs.createWriteStream(zipFilePath);
    const archive = archiver("zip", { zlib: { level: 9 } });
    outputZip.on("close", () => {
        console.log(`Snapshot '${snapshotName}' has been zipped and saved to '${zipFilePath}'.`);
    });
    archive.pipe(outputZip);
    archive.directory(snapshotPath, snapshotName);
    await archive.finalize();
};
exports.zipDirectoryUtil = zipDirectoryUtil;
//# sourceMappingURL=zipDirectoryUtil.js.map