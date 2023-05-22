import * as fg from "fast-glob"
import * as path from "path"

export const submitAllSnapshots = async () => {

    const snapshotFiles = await fg("*.zip", {
      cwd: path.resolve(process.cwd(), ".subsys"),
      dot: true,
      onlyFiles: true,
      deep: 0,
      ignore: ["node_modules/**", ".subsys/**", ".config"],
    });
    console.log("I have to submit all snapshots", snapshotFiles)
}