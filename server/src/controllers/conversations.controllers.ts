import { Request, Response } from "express";
import { findAllUserConversations } from "../services/conversations.services";
import { applyToResponse, applyToResponseCustom } from "../utils/errors/applyToResponse";

export async function getConversationsHandler(_req: Request, res: Response) {
    try {
        const { userId } = res.locals.user;

        const conversations = await findAllUserConversations(userId);

        applyToResponse(res, 200, conversations);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}
