import { Response } from "express";
import { lookup } from "geoip-lite";
import { Session } from "@prisma/client";
import { SessionModel } from "../../prisma/models";
import { getClientIp } from "@supercharge/request-ip/dist";
import { SignNewSessionInput } from "../../@types/services/session.types";
import { createAuthCookies, removeAuthCookies } from "../../utils/user/auth/cookiesHelper";
import { SessionCreateInput, SessionWhereUniqueInput, SessionType, SessionWhereInput } from "../../@types/prisma/static.types";

export async function signNewSession(input: SignNewSessionInput): Promise<void> {
    const userData = lookup(getClientIp(input.req) || "");

    const { id: sessionId } = await createSession({ city: userData?.city || "", country: userData?.country || "", userAgent: input.req.get("user-agent") || "", user: { connect: { id: input.id } } });

    createAuthCookies(input.res, { userId: input.id, active: input.active, sessionId, accountType: input.accountType, subExpiration: input.subExpiration });
}

export async function createSession(input: SessionCreateInput): Promise<SessionType> {
    return await SessionModel.create({ data: input });
}

export async function findSingleSession(input: SessionWhereUniqueInput): Promise<SessionType | null> {
    return await SessionModel.findUnique({ where: input });
}

export async function findManySessions(input: SessionWhereInput): Promise<Session[]> {
    return await SessionModel.findMany({ where: input });
}

export async function deleteSingleSession(input: SessionWhereUniqueInput, res: Response): Promise<void> {
    await SessionModel.delete({ where: input });
    removeAuthCookies(res);
}

export async function deleteAllSessions(input: SessionWhereInput, res: Response): Promise<void> {
    await SessionModel.deleteMany({ where: input });
    removeAuthCookies(res);
}
