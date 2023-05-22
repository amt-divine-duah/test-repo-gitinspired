"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
// define the custom settings transport (console)
const options = {
    console: {
        level: "debug",
        handleExceptions: true,
        format: winston.format.combine(winston.format.colorize({
            all: true,
        }), winston.format.simple()),
        json: true,
    },
};
const logger = winston.createLogger({
    transports: [new winston.transports.Console(options.console)],
    exitOnError: false,
    format: winston.format.combine(winston.format.splat()),
});
exports.default = logger;
//# sourceMappingURL=winstonConfig.js.map