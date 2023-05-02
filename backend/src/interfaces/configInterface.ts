export interface configInterface {
  APP_PORT: number;
  NODE_ENV: string;
  SECRET_KEY: string;
  JWT_TOKEN_EXPIRATION: string;
  DEV_DATABASE_URL?: string;
  TEST_DATABASE_URL?: string;
  PROD_DATABASE_URL?: string;
}
