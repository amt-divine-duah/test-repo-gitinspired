import logger from "../configs/winstonConfig";

export const createSnapShot = async (snapshotName: string) => {
  logger.info("I want to create snapshot directory %j", snapshotName);
  const timestamp = Date.now()
  const uniqueSnapShotName = `${timestamp}-${snapshotName}`

  console.log("This is the unique name", uniqueSnapShotName)
};