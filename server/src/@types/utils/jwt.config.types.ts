import jwt from "jsonwebtoken";
import { UserType, SessionType, EmailVerificationType, PasswordResetType } from "../prisma/static.types";
import { AccountType } from "@prisma/client";

export interface userTokenFormatInput {
    userId: UserType["id"];
    active: UserType["active"];
    sessionId: SessionType["id"];
    accountType: AccountType;
}

export interface userTokenFormat extends userTokenFormatInput, jwt.JwtPayload {
    canRefresh: boolean;
}

export interface emailTokenFormat extends jwt.JwtPayload {
    objectId: EmailVerificationType["id"] | PasswordResetType["id"];
    newEmail?: string;
}

export type jwtEnumFormat = emailTokenFormat | userTokenFormat;
