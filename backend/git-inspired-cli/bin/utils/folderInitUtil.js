"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeFolder = void 0;
const fs = require("fs-extra");
const hidefile = require("hidefile");
const path = require("path");
const winstonConfig_1 = require("../configs/winstonConfig");
const constants_1 = require("../constants/constants");
const initializeFolder = async () => {
    const folderName = constants_1.FOLDERNAME.NAME;
    const folderPath = path.resolve(process.cwd(), folderName);
    winstonConfig_1.default.info(folderPath);
    try {
        const folderExists = await fs.pathExists(folderPath);
        if (folderExists) {
            winstonConfig_1.default.info("Folder already initialized");
        }
        else {
            fs.mkdirSync(folderPath);
            hidefile.hideSync(folderPath);
            winstonConfig_1.default.info(`Folder ${folderName} initialized`);
        }
    }
    catch (error) {
        winstonConfig_1.default.error("Error initializing folder", error);
    }
};
exports.initializeFolder = initializeFolder;
//# sourceMappingURL=folderInitUtil.js.map