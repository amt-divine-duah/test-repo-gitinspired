"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configDirectory = void 0;
const fs = require("fs-extra");
const constants_1 = require("../constants/constants");
const hidefile = require("hidefile");
const axios_1 = require("axios");
const configDirectory = async (response) => {
    //validate first
    const res = await axios_1.default.post(constants_1.API.CONFIG, response);
    const file = constants_1.FILENAME.CONFIG;
    if (res.data.success) {
        try {
            fs.writeFileSync(file, JSON.stringify(response));
            hidefile.hideSync(file);
            console.log(`Folder configured successully on ${response.uniqueCode}`);
        }
        catch (e) {
            console.log(e);
        }
    }
    else {
        console.log("Invalid unique code or id. Please confirm");
    }
};
exports.configDirectory = configDirectory;
//# sourceMappingURL=configDirectory.js.map