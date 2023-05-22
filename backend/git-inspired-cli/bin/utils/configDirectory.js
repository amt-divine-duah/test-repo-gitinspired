"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configDirectory = void 0;
const fs = require("fs-extra");
const constants_1 = require("../constants/constants");
const hidefile = require("hidefile");
const path = require("path");
const configDirectory = async (response) => {
    const file = path.resolve(process.cwd(), constants_1.FILENAME.CONFIG);
    try {
        if (!fs.existsSync(file)) {
            fs.writeFileSync(file, JSON.stringify(response));
        }
        else {
            fs.unlinkSync(file);
            fs.writeFileSync(file, JSON.stringify(response));
        }
        fs.chmodSync(file, 0o666);
        hidefile.hideSync(file);
        console.log(`Folder configured successully on ${response.uniqueCode}`);
    }
    catch (e) {
        console.log(e);
    }
};
exports.configDirectory = configDirectory;
//# sourceMappingURL=configDirectory.js.map