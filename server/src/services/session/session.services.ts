import { SessionCreateInput, SessionType } from "../../@types/prisma/static.types";
import { SignNewSessionInput } from "../../@types/services/session.types";
import { SessionModel } from "../../prisma/models";

export async function signNewSession(input: SignNewSessionInput) {
    const session = await createSession({ userId: "hehehaasa", city: "12", country: "poland", userAgent: "poland" });
}

export async function createSession(input: SessionCreateInput): Promise<{ id: SessionType["id"] }> {
    const session = await SessionModel.create({ data: input, select: { id: true } });
    return session;
}
