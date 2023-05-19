"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareDirectories = void 0;
const fg = require("fast-glob");
const fs = require("fs-extra");
const path = require("path");
const ignore_1 = require("ignore");
const fastEqual = require("fast-deep-equal");
const compareDirectories = async (initDirectory, currentDirectory) => {
    const initDirectoryFiles = await fg("**", {
        cwd: initDirectory,
        dot: true,
        ignore: ["node_modules/**", ".config"],
    });
    const currentDirectoryFiles = await fg("**", {
        cwd: currentDirectory,
        dot: true,
        ignore: ["node_modules/**", ".subsys/**", ".config"],
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
    //  Check for changes in files
    if (!fastEqual(initDirectoryFiles.sort(), filteredCurrentDirFiles.sort())) {
        return false;
    }
    for (const file of initDirectoryFiles) {
        const initDirectoryPath = path.join(initDirectory, file);
        const currentDirectoryPath = path.join(currentDirectory, file);
        const content1 = await fs.readFile(initDirectoryPath, "utf-8");
        const content2 = await fs.readFile(currentDirectoryPath, "utf-8");
        if (content1 !== content2) {
            return false;
        }
    }
    return true;
};
exports.compareDirectories = compareDirectories;
//# sourceMappingURL=compareDirectories.js.map