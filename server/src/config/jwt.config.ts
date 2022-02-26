import jwt from "jsonwebtoken";
import { emailTokenFormat, jwtEnumFormat, userTokenFormat, userTokenFormatInput } from "../@types/utils/jwt.config.types";
import { ExpiredLink, Forbidden } from "../utils/errors/main";
import { MAIN_SECRET_TOKEN, ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL, EMAIL_TOKEN_TTL, EMAIL_SECRET_TOKEN } from "./env.config";

export function signJWT(data: jwtEnumFormat, secret: string, expiredTime: string) {
    return jwt.sign(data, secret, { expiresIn: expiredTime });
}

export function verifyJWT(token: string, secret: string): { expired: boolean; decoded: any | emailTokenFormat | null } {
    try {
        const decoded = <emailTokenFormat | userTokenFormat | null>jwt.verify(token, secret);
        return {
            decoded,
            expired: false,
        };
    } catch (e: any) {
        return {
            decoded: null,
            expired: e.message === "jwt expired",
        };
    }
}

export function signUserAccessTokenJWT(data: userTokenFormatInput): string {
    return signJWT({ ...data, canRefresh: false }, MAIN_SECRET_TOKEN, ACCESS_TOKEN_TTL);
}

export function signUserRefreshTokenJWT(data: userTokenFormatInput): string {
    return signJWT({ ...data, canRefresh: true }, MAIN_SECRET_TOKEN, REFRESH_TOKEN_TTL);
}

export function verifyUserTokenJWT(token: string): { decoded: userTokenFormat | null; expired: boolean } {
    return verifyJWT(token, MAIN_SECRET_TOKEN);
}

export function signEmailTokenJWT(data: emailTokenFormat) {
    return signJWT(data, EMAIL_SECRET_TOKEN, EMAIL_TOKEN_TTL);
}

export function verifyEmailTokenJWT(token: string): emailTokenFormat {
    const { decoded, expired } = verifyJWT(token, EMAIL_SECRET_TOKEN);

    if (expired) throw new ExpiredLink();

    if (!decoded) throw new Forbidden();

    return decoded;
}
