import { Response } from "express";
import { userTokenFormat, userTokenFormatInput } from "../../../@types/utils/jwt.config.types";
import { COOKIE_TYPE } from "../../../config/cookies.config";
import { ACCESS_TOKEN_TTL, MAIN_SECRET_TOKEN, MAX_AGE_TOKEN_COOKIE, REFRESH_TOKEN_TTL } from "../../../config/env.config";
import { signJWT } from "../../../config/jwt.config";

function createAuthCookies(res: Response, data: userTokenFormatInput): void {
    //generate auth tokens
    const accessToken = signJWT({ ...data, canRefresh: false }, MAIN_SECRET_TOKEN, ACCESS_TOKEN_TTL);
    const refreshToken = signJWT({ ...data, canRefresh: true }, MAIN_SECRET_TOKEN, REFRESH_TOKEN_TTL);

    // attach to response cookies
    res.cookie(COOKIE_TYPE.accessToken, accessToken, {
        sameSite: "strict",
        secure: true,
        httpOnly: true,
        maxAge: MAX_AGE_TOKEN_COOKIE,
    });
    res.cookie(COOKIE_TYPE.refreshToken, refreshToken, {
        sameSite: "strict",
        secure: true,
        httpOnly: true,
        maxAge: MAX_AGE_TOKEN_COOKIE,
    });
}

export default createAuthCookies;
