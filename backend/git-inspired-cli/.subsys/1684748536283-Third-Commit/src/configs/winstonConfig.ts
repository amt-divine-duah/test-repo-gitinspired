import * as winston from "winston";

// define the custom settings transport (console)
const options = {
  console: {
    level: "debug",
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.colorize({
        all: true,
      }),
      winston.format.simple()
    ),
    json: true,
  },
};

const logger = winston.createLogger({
  transports: [new winston.transports.Console(options.console)],
  exitOnError: false, // do not exit on handled exceptions
  format: winston.format.combine(winston.format.splat()),
});


export default logger;
