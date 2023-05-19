"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareDirectories = void 0;
const fg = require("fast-glob");
const fs = require("fs-extra");
const path = require("path");
const ignore_1 = require("ignore");
const fastEqual = require("fast-deep-equal");
const compareDirectories = async (initDirectory, currentDirectory, snapshotName) => {
    const initDirectoryFiles = await fg("**", {
        cwd: initDirectory,
        dot: true,
        ignore: ["node_modules/**"],
    });
    const currentDirectoryFiles = await fg("**", {
        cwd: currentDirectory,
        dot: true,
        ignore: ["node_modules/**", ".subsys/**"],
    });
    // ignore files specified in the ".subsysignore"
    const ignoreFilePath = path.resolve(process.cwd(), ".subsysignore");
    const ig = (0, ignore_1.default)();
    if (fs.existsSync(ignoreFilePath)) {
        const ignoreFileContent = fs.readFileSync(ignoreFilePath, "utf-8");
        // Add the ignore patterns from the file to the ignore instance
        ig.add(ignoreFileContent);
    }
    const filteredCurrentDirFiles = currentDirectoryFiles.filter(ig.createFilter());
    console.log(filteredCurrentDirFiles, "I filtered the array");
    console.log(initDirectoryFiles, "I have init directory files");
    //  Check for changes in files
    if (!fastEqual(initDirectoryFiles.sort(), filteredCurrentDirFiles.sort())) {
        console.log("These are different");
        return false;
    }
    for (const file of initDirectoryFiles) {
        const initDirectoryPath = path.join(initDirectory, file);
        const currentDirectoryPath = path.join(currentDirectory, file);
        const content1 = await fs.readFile(initDirectoryPath, "utf-8");
        const content2 = await fs.readFile(currentDirectoryPath, "utf-8");
        console.log("doing this", initDirectoryPath, currentDirectoryPath);
        if (content1 !== content2) {
            console.log("Files have been changed");
            return false;
        }
    }
    console.log("Files contain the same data");
    return true;
    // if (!initDirectoryFiles.length) {
    //   const snapshotPath = path.resolve(process.cwd(), ".subsys", snapshotName);
    //   // copy current directory into the subsys folder
    //   try {
    //     // Create the snapshot directory if it doesn't exist
    //     await fs.ensureDir(snapshotPath);
    //     // Copy the files from current directory to snapshot directory
    //     for (const file of currentDirFiles) {
    //       if (!ig.ignores(file)) {
    //         const sourceFile = path.join(currentDir, file);
    //         const targetFile = path.join(snapshotPath, file);
    //         await fs.copy(sourceFile, targetFile);
    //       }
    //     }
    //     console.log(`Directory contents copied to '${snapshotPath}'.`);
    //     //   Zip the contents
    //     await zipDirectoryUtil(snapshotName, snapshotPath);
    //   } catch (error) {
    //     console.error("Directory copy failed:", error);
    //   }
    // }
};
exports.compareDirectories = compareDirectories;
//# sourceMappingURL=compareDirectories.js.map