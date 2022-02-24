import jwt from "jsonwebtoken";
import { jwtEnumFormat } from "../@types/utils/jwt.config.types";

export function signJWT(data: jwtEnumFormat, secret: string, expiredTime: string) {
    return jwt.sign(data, secret, { expiresIn: expiredTime });
}

export function verifyJWT(token: string, secret: string): { expired: boolean; decoded: jwtEnumFormat | null } {
    try {
        const decoded = <jwtEnumFormat | null>jwt.verify(token, secret);
        return {
            expired: false,
            decoded,
        };
    } catch (e: any) {
        return {
            expired: e.message === "jwt expired",
            decoded: null,
        };
    }
}
