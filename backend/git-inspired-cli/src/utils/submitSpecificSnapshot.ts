import * as path from "path"
import * as fg from "fast-glob"
import * as _ from "lodash"


export const submitSpecificSnapshot = async (snapshotName: string) => {
    let snapshotFiles: string[] = [];
    const allSnapshotFiles = await fg("*.zip", {
      cwd: path.resolve(process.cwd(), ".subsys"),
      dot: true,
      onlyFiles: true,
      deep: 0,
      ignore: ["node_modules/**", ".subsys/**", ".config"],
    });

    for (const file of allSnapshotFiles) {
        // Get the filename, without the extension
        const filename = path.basename(file, path.extname(file))
        const slugifiedName = filename.slice(filename.indexOf("-") + 1);

        if (snapshotName === slugifiedName) {
            snapshotFiles.push(file)
        }
    }
    
    return snapshotFiles

}