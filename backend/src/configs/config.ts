import * as dotenv from "dotenv";
import { configInterface } from "../interfaces/configInterface";
import logger from "./winstonConfig";

dotenv.config();

const mainConfig: configInterface = {
  APP_PORT: Number(process.env.APP_PORT) || 3001,
  NODE_ENV: process.env.NODE_ENV || "development",
  SECRET_KEY: process.env.SECRET_KEY || "my-secret",
  JWT_TOKEN_EXPIRATION: process.env.JWT_TOKEN_EXPIRATION || "1h",
  MAILER_ADD: process.env.MAILER_ADD,
  MAILER_PASS: process.env.MAILER_PASS,
  MAILER_HOST: process.env.MAILER_HOST,
  MAILER_PORT: process.env.MAILER_PORT,
  ACCOUNT_CONFIRMATION_URL: process.env.ACCOUNT_CONFIRMATION_URL,
};

const developmentConfig: configInterface = {
  ...mainConfig,
  DEV_DATABASE_URL: process.env.DEV_DATABASE_URL || "",
};

const testingConfig: configInterface = {
  ...mainConfig,
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || "",
};

const productionConfig: configInterface = {
  ...mainConfig,
  PROD_DATABASE_URL: process.env.PROD_DATABASE_URL || "",
};

let configValues: configInterface;

switch (process.env.NODE_ENV) {
  case "development":
    configValues = developmentConfig;
    break;
  case "testing":
    configValues = testingConfig;
  case "production":
    configValues = productionConfig;
  default:
    logger.warn(
      "Invalid NODE_ENV value. Defaulting to development configuration."
    );
    configValues = developmentConfig;
    break;
}

export default configValues;
