import { getClientIp } from "@supercharge/request-ip/dist";
import { lookup } from "geoip-lite";
import { omit } from "lodash";
import { EmailVerificationCreateInput, EmailVerificationType, SessionCreateInput, SessionType } from "../../@types/prisma/static.types";
import { SignNewSessionInput } from "../../@types/services/session.types";
import { EmailVerificationModel, SessionModel, UserModel } from "../../prisma/models";

export async function signNewSession(input: SignNewSessionInput) {
    const ip = getClientIp(input.req) || "";
    const userData = lookup(ip);

    const session = await createSession({ city: userData?.city || "", country: userData?.country || "", userAgent: input.req.get("user-agent") || "", user: { connect: { id: input.id } } });
}

export async function createSession(input: SessionCreateInput): Promise<SessionType> {
    const session = await SessionModel.create({ data: input });

    return session;
}
