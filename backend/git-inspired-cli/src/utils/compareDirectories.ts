import * as fg from "fast-glob";
import * as fs from "fs-extra";
import * as path from "path";
import ignore from "ignore";
import * as fastEqual from "fast-deep-equal";


export const compareDirectories = async (
  initDirectory: string,
  currentDirectory: string,
) => {
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
  const ig = ignore();
  if (fs.existsSync(ignoreFilePath)) {
    const ignoreFileContent = fs.readFileSync(ignoreFilePath, "utf-8");

    // Add the ignore patterns from the file to the ignore instance
    ig.add(ignoreFileContent);
  }
  const filteredCurrentDirFiles = currentDirectoryFiles.filter(
    ig.createFilter()
  );

  //  Check for changes in files
  if (!fastEqual(initDirectoryFiles.sort(), filteredCurrentDirFiles.sort())) {
    return false
  } 

  for (const file of initDirectoryFiles) {
    const initDirectoryPath = path.join(initDirectory, file)
    const currentDirectoryPath = path.join(currentDirectory, file)


    const content1 = await fs.readFile(initDirectoryPath, "utf-8")
    const content2 = await fs.readFile(currentDirectoryPath, "utf-8")

    if (content1 !== content2) {
      return false
    }
  }

  return true

};
