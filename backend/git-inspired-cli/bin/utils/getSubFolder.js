"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubFolder = void 0;
const fs = require("fs-extra");
const path = require("path");
const getSubFolder = async (initDirectory) => {
    try {
        const entries = await fs.readdir(initDirectory, { withFileTypes: true });
        console.log(entries, "I have entries");
        const subfolders = entries
            .filter((entry) => entry.isDirectory())
            .map((entry) => path.join(initDirectory, entry.name));
        console.log("I have subfolders", subfolders);
        return subfolders;
    }
    catch (error) {
        console.log(error, "I have error");
        return false;
    }
};
exports.getSubFolder = getSubFolder;
//# sourceMappingURL=getSubFolder.js.map