import { MAX_AGE_TOKEN_COOKIE } from "./env.config";

export const COOKIE_TYPE = {
    ACCESS_TOKEN: "accessToken",
    REFRESH_TOKEN: "refreshToken",
};

export const cookiesConfig = {
    sameSite: "strict",
    secure: true,
    httpOnly: true,
    maxAge: MAX_AGE_TOKEN_COOKIE,
};
