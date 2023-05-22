import archiver = require("archiver");
import * as fs from "fs-extra";
import path = require("path");
import logger from "../configs/winstonConfig";

export const zipDirectoryUtil = async (snapshotName, snapshotPath) => {
  // Create a zip file of the snapshot directory
  const zipFileName = `${snapshotName}.zip`;
  const zipFilePath = path.resolve(process.cwd(), ".subsys", zipFileName);
  const outputZip = fs.createWriteStream(zipFilePath);
  const archive = archiver("zip", { zlib: { level: 9 } });

  outputZip.on("close", () => {
    logger.info(
      `Snapshot '${snapshotName}' has been zipped.`
    );
  });

  archive.pipe(outputZip);
  archive.directory(snapshotPath, snapshotName);
  await archive.finalize();
};
