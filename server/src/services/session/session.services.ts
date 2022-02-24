import { lookup } from "geoip-lite";
import { Response } from "express";
import { getClientIp } from "@supercharge/request-ip/dist";
import { SessionCreateInput, SessionType } from "../../@types/prisma/static.types";
import { SignNewSessionInput } from "../../@types/services/session.types";
import { SessionModel } from "../../prisma/models";
import createAuthCookies from "../../utils/user/auth/cookieCreator";

export async function signNewSession(input: SignNewSessionInput): Promise<void> {
    const userData = lookup(getClientIp(input.req) || "");

    const session = await createSession({ city: userData?.city || "", country: userData?.country || "", userAgent: input.req.get("user-agent") || "", user: { connect: { id: input.id } } });

    createAuthCookies(input.res, { userId: input.id, active: input.active, sessionId: session.id });
}

export async function createSession(input: SessionCreateInput): Promise<SessionType> {
    const session = await SessionModel.create({ data: input });

    return session;
}
