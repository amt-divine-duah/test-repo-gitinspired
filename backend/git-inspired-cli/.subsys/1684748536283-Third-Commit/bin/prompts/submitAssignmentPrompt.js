"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitAssignmentPrompt = void 0;
exports.submitAssignmentPrompt = {
    type: "input",
    name: "password",
    message: "Please enter your password",
    validate: (input) => {
        if (input.trim().length === 0) {
            return "Please enter your password";
        }
        return true;
    },
};
//# sourceMappingURL=submitAssignmentPrompt.js.map