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
    const currentDirectoryFiles = await fg("**", {
        cwd: currentDirectory,
        dot: true,
        ignore: ["node_modules/**", ".subsys/**"],
    });
    if (response && response.length > 0) {
        console.log("I can start comparing here");
        const isSameFiles = await (0, compareDirectories_1.compareDirectories)(path.resolve(response[0]), currentDirectory, uniqueSnapShotName);
        if (isSameFiles) {
            console.log("Do nothing");
        }
        else if (!isSameFiles) {
            console.log("replace the response with current directory and store new zip files");
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
                console.log(`Directory contents copied to '${snapshotPath}'.`);
                //   Zip the contents
                await (0, zipDirectoryUtil_1.zipDirectoryUtil)(uniqueSnapShotName, snapshotPath);
            }
            catch (error) {
                console.error("Directory copy failed:", error);
            }
        }
    }
    else {
        console.log("Nothing in subsys, create new folders");
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
            console.log(`Directory contents copied to '${snapshotPath}'.`);
            //   Zip the contents
            await (0, zipDirectoryUtil_1.zipDirectoryUtil)(uniqueSnapShotName, snapshotPath);
        }
        catch (error) {
            console.error("Directory copy failed:", error);
        }
    }
    const ignoreFilePath = path.resolve(process.cwd(), ".subsysignore");
    // if there is subsysignore, ignore all the files here
    if (fs.existsSync(ignoreFilePath)) {
        console.log("Ignore all the files in the subsys ignore");
    }
    else {
        console.log("Ignore certain files");
    }
    console.log("This is the current directory", ignoreFilePath);
    console.log("This is the unique name", uniqueSnapShotName);
    return;
};
exports.createSnapShot = createSnapShot;
const createSnapshotFile = () => {
    // Perform snapshot creation logic here using the file path
    // For example, copy the file to the snapshot directory
    winstonConfig_1.default.info("Snapshot");
};
//# sourceMappingURL=createSnapShotUtil.js.map