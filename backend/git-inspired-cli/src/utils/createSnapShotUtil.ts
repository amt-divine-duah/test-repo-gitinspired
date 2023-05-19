import * as path from "path";
import * as fs from "fs-extra";
import logger from "../configs/winstonConfig";
import { compareDirectories } from "./compareDirectories";
import { getSubFolder } from "./getSubFolder";
import ignore from "ignore";
import * as fg from "fast-glob";
import { zipDirectoryUtil } from "./zipDirectoryUtil";

export const createSnapShot = async (snapshotName: string) => {
  const timestamp = Date.now();
  const uniqueSnapShotName = `${timestamp}-${snapshotName}`;
  const initDirectory = path.resolve(process.cwd(), ".subsys");
  const currentDirectory = process.cwd()
  const response = await getSubFolder(initDirectory);

  // Check if init directory has been created
  if (!fs.existsSync(initDirectory)) {
    logger.warn(`Please initialize a directory using "subsys init" command`);
    return
  }

  const currentDirectoryFiles = await fg("**", {
    cwd: currentDirectory,
    dot: true,
    ignore: ["node_modules/**", ".subsys/**", ".config"],
  });

  if (response && response.length > 0) {
     const isSameFiles = await compareDirectories(
       path.resolve(response[0]),
       currentDirectory
     );
     if (isSameFiles) {
      console.log("Do nothing")
     }
     else if (!isSameFiles) {
      // Remove the old folder
      fs.removeSync(response[0])
      // Replace new content
      const snapshotPath = path.resolve(
        process.cwd(),
        ".subsys",
        uniqueSnapShotName
      );
      try {
        // Create the snapshot directory if it doesn't exist
        await fs.ensureDir(snapshotPath);
        // ignore files specified in the ".subsysignore"
        const ignoreFilePath = path.resolve(process.cwd(), ".subsysignore");
        const ig = ignore();
        if (fs.existsSync(ignoreFilePath)) {
          const ignoreFileContent = fs.readFileSync(ignoreFilePath, "utf-8");

          // Add the ignore patterns from the file to the ignore instance
          ig.add(ignoreFileContent);
        }
        const filteredCurrentDirFiles = currentDirectoryFiles.filter(
          ig.createFilter()
        );
        // Copy the files from current directory to snapshot directory
        for (const file of filteredCurrentDirFiles) {
          const sourceFile = path.join(currentDirectory, file);
          const targetFile = path.join(snapshotPath, file);

          await fs.copy(sourceFile, targetFile);
        }
        //   Zip the contents
        await zipDirectoryUtil(uniqueSnapShotName, snapshotPath);
      } catch (error) {
        logger.error("Directory copy failed:", error);
        return
      }

     }
  } else {
    const snapshotPath = path.resolve(process.cwd(), ".subsys", uniqueSnapShotName);
    try {
      // Create the snapshot directory if it doesn't exist
      await fs.ensureDir(snapshotPath);
      // ignore files specified in the ".subsysignore"
      const ignoreFilePath = path.resolve(process.cwd(), ".subsysignore");
      const ig = ignore();
      if (fs.existsSync(ignoreFilePath)) {
        const ignoreFileContent = fs.readFileSync(ignoreFilePath, "utf-8");

        // Add the ignore patterns from the file to the ignore instance
        ig.add(ignoreFileContent);
      }
      const filteredCurrentDirFiles = currentDirectoryFiles.filter(
        ig.createFilter()
      );
      // Copy the files from current directory to snapshot directory
      for (const file of filteredCurrentDirFiles) {
          const sourceFile = path.join(currentDirectory, file);
          const targetFile = path.join(snapshotPath, file);

          await fs.copy(sourceFile, targetFile);
        
      }

      //   Zip the contents
      await zipDirectoryUtil(uniqueSnapShotName, snapshotPath);
    } catch (error) {
      logger.error("Directory copy failed %j", error);
      return
    }
  }
  return;
};

