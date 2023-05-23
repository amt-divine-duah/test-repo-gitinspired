"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileToCloud = exports.uploadFileToDropbox = void 0;
const fs = require("fs");
const dropbox_1 = require("dropbox");
const winstonConfig_1 = require("../configs/winstonConfig");
const B2 = require("backblaze-b2");
const uploadFileToDropbox = async (accessToken, filePath, destinationPath) => {
    const dbx = new dropbox_1.Dropbox({ accessToken });
    const fileContent = fs.readFileSync(filePath);
    try {
        const response = await dbx.filesUpload({
            path: destinationPath,
            contents: fileContent,
        });
    }
    catch (error) {
        winstonConfig_1.default.error("An error occurred while uploading the file", error);
    }
};
exports.uploadFileToDropbox = uploadFileToDropbox;
const uploadFileToCloud = async (filePath, fileName) => {
    const fileContent = fs.readFileSync(filePath);
    try {
        const b2 = new B2({
            applicationKeyId: "005ff24cc418b510000000001",
            applicationKey: "K005g671gMA3oFiLPf4LHiVSkkhBk24",
        });
        await b2.authorize();
        const response = await b2.getUploadUrl({
            bucketId: "ff0f42344c4c4471888b0511",
        });
        const fileUploadRes = await b2.uploadFile({
            uploadUrl: response.data.uploadUrl,
            uploadAuthToken: response.data.authorizationToken,
            fileName: fileName,
            data: fileContent,
            onUploadProgress: null,
        });
    }
    catch (error) {
        winstonConfig_1.default.error("Something went wrong");
    }
};
exports.uploadFileToCloud = uploadFileToCloud;
//# sourceMappingURL=uploadFileToCloud.js.map