import "dotenv/config";

export const PORT = process.env.PORT;
export const ORIGIN = process.env.ORIGIN;
export const MAIN_SECRET_TOKEN = process.env.MAIN_SECRET_TOKEN;
export const ACCESS_TOKEN_TTL = process.env.ACCESS_TOKEN_TTL;
export const REFRESH_TOKEN_TTL = process.env.REFRESH_TOKEN_TTL;
export const SERVER_SUPPORT_EMAIL = process.env.SERVER_SUPPORT_EMAIL;
export const SERVER_SUPPORT_PASSWORD = process.env.SERVER_SUPPORT_PASSWORD;
export const EMAIL_SECRET_TOKEN = process.env.EMAIL_SECRET_TOKEN;
export const EMAIL_TOKEN_TTL = process.env.EMAIL_TOKEN_TTL;
export const MAX_AGE_TOKEN_COOKIE = process.env.MAX_AGE_TOKEN_COOKIE;
export const TEST_EMAIL_ADDRESS = process.env.TEST_EMAIL_ADDRESS;
export const TEST_EMAIL_PASSWORD = process.env.TEST_EMAIL_PASSWORD;
