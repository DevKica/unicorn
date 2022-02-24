import { Response } from "express";
import { userTokenFormat, userTokenFormatInput } from "../../../@types/utils/jwt.config.types";
import { COOKIE_TYPE } from "../../../config/cookies.config";
import { ACCESS_TOKEN_TTL, MAIN_SECRET_TOKEN, MAX_AGE_TOKEN_COOKIE, REFRESH_TOKEN_TTL } from "../../../config/env.config";
import { signJWT } from "../../../config/jwt.config";

export function createAccessCookie(res: Response, data: userTokenFormatInput): void {
    const accessToken = signJWT({ ...data, canRefresh: false }, MAIN_SECRET_TOKEN, ACCESS_TOKEN_TTL);
    res.cookie(COOKIE_TYPE.ACCESS_TOKEN, accessToken, {
        sameSite: "strict",
        secure: true,
        httpOnly: true,
        maxAge: MAX_AGE_TOKEN_COOKIE,
    });
}

export function createRefreshCookie(res: Response, data: userTokenFormatInput): void {
    const refreshToken = signJWT({ ...data, canRefresh: true }, MAIN_SECRET_TOKEN, REFRESH_TOKEN_TTL);

    res.cookie(COOKIE_TYPE.REFRESH_TOKEN, refreshToken, {
        sameSite: "strict",
        secure: true,
        httpOnly: true,
        maxAge: MAX_AGE_TOKEN_COOKIE,
    });
}
export function createAuthCookies(res: Response, data: userTokenFormatInput): void {
    createAccessCookie(res, data);
    createRefreshCookie(res, data);
}

export function removeAuthCookies(res: Response): void {
    res.clearCookie(COOKIE_TYPE.ACCESS_TOKEN);
    res.clearCookie(COOKIE_TYPE.REFRESH_TOKEN);
}
