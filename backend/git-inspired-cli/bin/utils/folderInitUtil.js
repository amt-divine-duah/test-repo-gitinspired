"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeFolder = void 0;
const path = require("path");
const fs = require("fs-extra");
const appRoot = require("app-root-path");
const hidefile = require("hidefile");
const constants_1 = require("../constants/constants");
const winstonConfig_1 = require("../configs/winstonConfig");
const initializeFolder = async () => {
    const rootPath = appRoot.path;
    const folderName = constants_1.FOLDERNAME.NAME;
    const folderPath = path.resolve(rootPath, folderName);
    try {
        const folderExists = await fs.pathExists(folderPath);
        if (folderExists) {
            winstonConfig_1.default.warn("Folder already initialized");
        }
        else {
            fs.mkdirSync(folderPath);
            hidefile.hideSync(folderPath);
            console.log(`Folder ${folderName} initialized`);
        }
    }
    catch (error) {
        console.log("Error initializing folder", error);
    }
};
exports.initializeFolder = initializeFolder;
//# sourceMappingURL=folderInitUtil.js.map