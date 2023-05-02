import winston from "winston";

// define the custom settings transport (console)
const options = {
  console: {
    level: "debug",
    handleExceptions: true,
    format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    json: true,
  },
};

const logger = winston.createLogger({
  transports: [new winston.transports.Console(options.console)],
  exitOnError: false, // do not exit on handled exceptions
  format: winston.format.combine(
    winston.format.splat(),
  )
});

// create a stream object with a 'write' function that will be used by `morgan`
export const myStream = {
  write: (text: string) => {
    logger.info(text);
  },
};

export default logger;
