import * as path from "path"
import * as fg from "fast-glob"

export const submitSpecificSnapshot = async (snapshot: string) => {
    console.log("I submit specific snapshot here", snapshot)
    const snapshotFiles = await fg("*.zip", {
      cwd: path.resolve(process.cwd(), ".subsys"),
      dot: true,
      onlyFiles: true,
      deep: 0,
      ignore: ["node_modules/**", ".subsys/**", ".config"],
    });

    console.log(snapshotFiles)
}