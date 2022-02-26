import { Response } from "express";
import { userTokenFormatInput } from "../../../@types/utils/jwt.config.types";
import { COOKIE_TYPE } from "../../../config/cookies.config";
import { MAX_AGE_TOKEN_COOKIE } from "../../../config/env.config";
import { signUserAccessTokenJWT, signUserRefreshTokenJWT } from "../../../config/jwt.config";

const { ACCESS_TOKEN, REFRESH_TOKEN } = COOKIE_TYPE;

export function createAccessCookie(res: Response, data: userTokenFormatInput): void {
    const accessToken = signUserAccessTokenJWT(data);
    res.cookie(ACCESS_TOKEN, accessToken, {
        sameSite: "strict",
        secure: true,
        httpOnly: true,
        maxAge: MAX_AGE_TOKEN_COOKIE,
    });
}

export function createRefreshCookie(res: Response, data: userTokenFormatInput): void {
    const refreshToken = signUserRefreshTokenJWT(data);

    res.cookie(REFRESH_TOKEN, refreshToken, {
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
    res.clearCookie(ACCESS_TOKEN);
    res.clearCookie(REFRESH_TOKEN);
}
