"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSnapShot = void 0;
const winstonConfig_1 = require("../configs/winstonConfig");
const createSnapShot = async (snapshotName) => {
    winstonConfig_1.default.info("I want to create snapShot directory %j", snapshotName);
    const timestamp = Date.now();
    const uniqueSnapShotName = `${timestamp}-${snapshotName}`;
    console.log("This is the unique name", uniqueSnapShotName);
};
exports.createSnapShot = createSnapShot;
//# sourceMappingURL=createSnapShotUtil.js.map