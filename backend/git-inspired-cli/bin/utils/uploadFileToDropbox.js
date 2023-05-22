"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileToDropbox = void 0;
const fs = require("fs");
const dropbox_1 = require("dropbox");
const winstonConfig_1 = require("../configs/winstonConfig");
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
//# sourceMappingURL=uploadFileToDropbox.js.map