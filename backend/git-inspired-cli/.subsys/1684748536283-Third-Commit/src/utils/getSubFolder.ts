 import * as fs from "fs-extra";
import * as path from "path";

export const getSubFolder = async (initDirectory) => {

    try {
      const entries = await fs.readdir(initDirectory, { withFileTypes: true });
      const subfolders = entries
        .filter((entry) => entry.isDirectory())
        .map((entry) => path.join(initDirectory, entry.name));
      
      return subfolders
    } catch (error) {
      return false
    }
}