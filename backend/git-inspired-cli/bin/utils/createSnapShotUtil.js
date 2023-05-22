"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSnapShot = void 0;
const path = require("path");
const fs = require("fs-extra");
const winstonConfig_1 = require("../configs/winstonConfig");
const compareDirectories_1 = require("./compareDirectories");
const getSubFolder_1 = require("./getSubFolder");
const ignore_1 = require("ignore");
const fg = require("fast-glob");
const zipDirectoryUtil_1 = require("./zipDirectoryUtil");
const createSnapShot = async (snapshotName) => {
    const timestamp = Date.now();
    const uniqueSnapShotName = `${timestamp}-${snapshotName}`;
    const initDirectory = path.resolve(process.cwd(), ".subsys");
    const currentDirectory = process.cwd();
    const response = await (0, getSubFolder_1.getSubFolder)(initDirectory);
    // Check if init directory has been created
    if (!fs.existsSync(initDirectory)) {
        winstonConfig_1.default.warn(`Please initialize a directory using "subsys init" command`);
        return;
    }
    const currentDirectoryFiles = await fg("**", {
        cwd: currentDirectory,
        dot: true,
        ignore: ["node_modules/**", ".subsys/**", ".config"],
    });
    if (currentDirectoryFiles.length === 0) {
        winstonConfig_1.default.info("Nothing to take snapshot of. Please add file(s).");
        return;
    }
    if (response && response.length > 0) {
        const isSameFiles = await (0, compareDirectories_1.compareDirectories)(path.resolve(response[0]), currentDirectory);
        if (isSameFiles) {
            console.log("Do nothing");
        }
        else if (!isSameFiles) {
            // Remove the old folder
            fs.removeSync(response[0]);
            // Replace new content
            const snapshotPath = path.resolve(process.cwd(), ".subsys", uniqueSnapShotName);
            try {
                // Create the snapshot directory if it doesn't exist
                await fs.ensureDir(snapshotPath);
                // ignore files specified in the ".subsysignore"
                const ignoreFilePath = path.resolve(process.cwd(), ".subsysignore");
                const ig = (0, ignore_1.default)();
                if (fs.existsSync(ignoreFilePath)) {
                    const ignoreFileContent = fs.readFileSync(ignoreFilePath, "utf-8");
                    // Add the ignore patterns from the file to the ignore instance
                    ig.add(ignoreFileContent);
                }
                const filteredCurrentDirFiles = currentDirectoryFiles.filter(ig.createFilter());
                // Copy the files from current directory to snapshot directory
                for (const file of filteredCurrentDirFiles) {
                    const sourceFile = path.join(currentDirectory, file);
                    const targetFile = path.join(snapshotPath, file);
                    await fs.copy(sourceFile, targetFile);
                }
                //   Zip the contents
                await (0, zipDirectoryUtil_1.zipDirectoryUtil)(uniqueSnapShotName, snapshotPath);
            }
            catch (error) {
                winstonConfig_1.default.error("Directory copy failed:", error);
                return;
            }
        }
    }
    else {
        const snapshotPath = path.resolve(process.cwd(), ".subsys", uniqueSnapShotName);
        try {
            // Create the snapshot directory if it doesn't exist
            await fs.ensureDir(snapshotPath);
            // ignore files specified in the ".subsysignore"
            const ignoreFilePath = path.resolve(process.cwd(), ".subsysignore");
            const ig = (0, ignore_1.default)();
            if (fs.existsSync(ignoreFilePath)) {
                const ignoreFileContent = fs.readFileSync(ignoreFilePath, "utf-8");
                // Add the ignore patterns from the file to the ignore instance
                ig.add(ignoreFileContent);
            }
            const filteredCurrentDirFiles = currentDirectoryFiles.filter(ig.createFilter());
            // Copy the files from current directory to snapshot directory
            for (const file of filteredCurrentDirFiles) {
                const sourceFile = path.join(currentDirectory, file);
                const targetFile = path.join(snapshotPath, file);
                await fs.copy(sourceFile, targetFile);
            }
            //   Zip the contents
            await (0, zipDirectoryUtil_1.zipDirectoryUtil)(uniqueSnapShotName, snapshotPath);
        }
        catch (error) {
            winstonConfig_1.default.error("Directory copy failed %j", error);
            return;
        }
    }
    return;
};
exports.createSnapShot = createSnapShot;
//# sourceMappingURL=createSnapShotUtil.js.map