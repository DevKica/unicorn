import "dotenv/config";
import process from "process";

export const PORT = process.env.PORT;
export const TEST_PORT = process.env.TEST_PORT;
export const ORIGIN = process.env.ORIGIN;
export const MAIN_SECRET_TOKEN = process.env.MAIN_SECRET_TOKEN;
export const ACCESS_TOKEN_TTL = process.env.ACCESS_TOKEN_TTL;
export const REFRESH_TOKEN_TTL = process.env.REFRESH_TOKEN_TTL;
export const SUPPORT_EMAIL_USERNAME = process.env.SUPPORT_EMAIL_USERNAME;
export const SUPPORT_EMAIL_PASSWORD = process.env.SUPPORT_EMAIL_PASSWORD;
export const EMAIL_SECRET_TOKEN = process.env.EMAIL_SECRET_TOKEN;
export const EMAIL_TOKEN_TTL = process.env.EMAIL_TOKEN_TTL;
export const MAX_AGE_TOKEN_COOKIE = process.env.MAX_AGE_TOKEN_COOKIE;
export const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL;
export const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD;
