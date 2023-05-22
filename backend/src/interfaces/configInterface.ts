export interface configInterface {
  APP_PORT: number;
  NODE_ENV: string;
  SECRET_KEY: string;
  JWT_TOKEN_EXPIRATION: string;
  DEV_DATABASE_URL?: string;
  TEST_DATABASE_URL?: string;
  PROD_DATABASE_URL?: string;
  MAILER_ADD?: string;
  MAILER_PASS?: string;
  MAILER_HOST?: string;
  MAILER_PORT?: string;
  ACCOUNT_CONFIRMATION_URL: string;
  ASSIGNMENT_INVITE_URL: string;
}
