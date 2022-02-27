import { lookup } from "geoip-lite";
import { getClientIp } from "@supercharge/request-ip/dist";
import { SignNewSessionInput } from "../../@types/services/session.types";
import { SessionModel } from "../../prisma/models";
import { createAuthCookies, removeAuthCookies } from "../../utils/user/auth/cookiesHelper";
import { SessionCreateInput, SessionFindUniqueInput, SessionType, SessionWhereInput } from "../../@types/prisma/static.types";
import { Response } from "express";

export async function signNewSession(input: SignNewSessionInput): Promise<void> {
    const userData = lookup(getClientIp(input.req) || "");

    const { id: sessionId } = await createSession({ city: userData?.city || "", country: userData?.country || "", userAgent: input.req.get("user-agent") || "", user: { connect: { id: input.id } } });

    createAuthCookies(input.res, { userId: input.id, active: input.active, sessionId });
}

export async function createSession(input: SessionCreateInput): Promise<SessionType> {
    return await SessionModel.create({ data: input });
}

export async function findSingleSession(input: SessionFindUniqueInput): Promise<SessionType | null> {
    return await SessionModel.findUnique({ where: input });
}

export async function deleteAllSessions(input: SessionWhereInput, res: Response): Promise<void> {
    await SessionModel.deleteMany({ where: input });
    removeAuthCookies(res);
}
