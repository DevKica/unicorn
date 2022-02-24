import jwt from "jsonwebtoken";
import { UserType, SessionType, EmailVerificationType, PasswordResetType } from "../prisma/static.types";

export interface userTokenFormat extends jwt.JwtPayload {
    userId: UserType["id"];
    active: UserType["active"];
    sessionId: SessionType["id"];
    canRefresh: boolean;
}

export interface emailTokenFormat extends jwt.JwtPayload {
    emailVerificationId: EmailVerificationType["id"] | PasswordResetType["id"];
    newEmail?: string;
}

export type jwtEnumFormat = emailTokenFormat | userTokenFormat;
