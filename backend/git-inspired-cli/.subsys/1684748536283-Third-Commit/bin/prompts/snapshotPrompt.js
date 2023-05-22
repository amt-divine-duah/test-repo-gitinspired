"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snapshotQuestion = void 0;
exports.snapshotQuestion = {
    type: "input",
    name: "name",
    message: "Enter the name of the snapshot",
    validate: (input) => {
        if (input.trim().length === 0) {
            return "Please enter a snapshot name";
        }
        return true;
    },
};
//# sourceMappingURL=snapshotPrompt.js.map