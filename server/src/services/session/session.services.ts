import { lookup } from "geoip-lite";
import { getClientIp } from "@supercharge/request-ip/dist";
import { SessionCreateInput, SessionFindUniqueInput, SessionType } from "../../@types/prisma/static.types";
import { SignNewSessionInput } from "../../@types/services/session.types";
import { SessionModel } from "../../prisma/models";
import { createAuthCookies } from "../../utils/user/auth/cookiesHelper";

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
