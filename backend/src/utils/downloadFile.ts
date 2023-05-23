import B2 from 'backblaze-b2';

export default async function getDownloadLink(snapName: string) {
  try {
    const b2 = new B2({
      applicationKeyId: '005ff24cc418b510000000001',
      applicationKey: 'K005g671gMA3oFiLPf4LHiVSkkhBk24',
    });
    await b2.authorize();
    // const authData = await b2.getDownloadAuthorization({
    //   bucketId: 'ff0f42344c4c4471888b0511',
    //   fileNamePrefix: '1684793850802-first-snapshot.zip',
    //   validDurationInSeconds: 60,
    // });
    // console.log(authData);
    const fileIsh = await b2.downloadFileByName({
      bucketName: 'git-inspired-app',
      fileName: snapName,
      responseType: 'arraybuffer',
    });

    return [fileIsh.config.url, fileIsh.data];
  } catch (err) {
    console.log(err);
  }
}

