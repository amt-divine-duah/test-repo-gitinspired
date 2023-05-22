"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubFolder = void 0;
const fs = require("fs-extra");
const path = require("path");
const getSubFolder = async (initDirectory) => {
    try {
        const entries = await fs.readdir(initDirectory, { withFileTypes: true });
        const subfolders = entries
            .filter((entry) => entry.isDirectory())
            .map((entry) => path.join(initDirectory, entry.name));
        return subfolders;
    }
    catch (error) {
        return false;
    }
};
exports.getSubFolder = getSubFolder;
//# sourceMappingURL=getSubFolder.js.map