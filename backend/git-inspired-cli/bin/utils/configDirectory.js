"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configDirectory = void 0;
const fs = require("fs-extra");
const constants_1 = require("../constants/constants");
const hidefile = require("hidefile");
const configDirectory = async (response) => {
    const file = constants_1.FILENAME.CONFIG;
    try {
        fs.writeFileSync(file, JSON.stringify(response));
        hidefile.hideSync(file);
        console.log(`Folder configured successully on ${response.uniqueCode}`);
    }
    catch (e) {
        console.log(e);
    }
};
exports.configDirectory = configDirectory;
//# sourceMappingURL=configDirectory.js.map