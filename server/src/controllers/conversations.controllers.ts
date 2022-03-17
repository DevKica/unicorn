import { Request, Response } from "express";
import { findAllUserConversations, findUniqueConversation, updateConversation } from "../services/conversations.services";
import { applyToResponse, applyToResponseCustom } from "../utils/errors/applyToResponse";
import { NotFound } from "../utils/errors/main";
import { SuccessResponse } from "../utils/responses/main";

export async function getConversationsHandler(_req: Request, res: Response) {
    try {
        const { userId } = res.locals.user;

        const conversations = await findAllUserConversations(userId);

        applyToResponse(res, 200, conversations);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}

export async function getSingleConversationHandler(req: Request, res: Response) {
    try {
        const { userId } = res.locals.user;
        const { conversationId } = req.params;

        const conversation = await findUniqueConversation({ id: conversationId as string }, userId);

        if (!conversation) throw new NotFound();

        applyToResponse(res, 200, conversation);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}

export async function changeConversationNameHandler(req: Request, res: Response) {
    try {
        const { userId } = res.locals.user;
        const { name, conversationId } = req.body;

        const { count } = await updateConversation({ conversationId, userId }, { name });

        if (!count) throw new NotFound();

        applyToResponse(res, 200, SuccessResponse);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}
