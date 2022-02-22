import jwt from "jsonwebtoken";
import { UserType, SessionType } from "../prisma/static.types";

export interface userTokenFormat extends jwt.JwtPayload {
    userId: UserType["id"];
    emailVerified: UserType["emailVerified"];
    sessionId: SessionType["id"];
    canRefresh: boolean;
}

export interface confirmEmailTokenFormat extends jwt.JwtPayload {
    userId: UserType["id"];
    newEmail: string;
}

export type jwtEnumFormat = confirmEmailTokenFormat | userTokenFormat;
