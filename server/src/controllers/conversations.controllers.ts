import { Request, Response } from "express";
import { findAllUserConversations, findUniqueConversation, updateConversation } from "../services/conversations.services";
import { createMessage } from "../services/messages.services";
import { applyToResponse, applyToResponseCustom } from "../utils/errors/applyToResponse";
import { NotFound } from "../utils/errors/main";

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

        const message = await createMessage({
            content: `Conversation name set to "${name}"`,
            user: {
                connect: { id: userId },
            },
            conversation: {
                connect: { id: conversationId },
            },
            type: "info",
        });

        applyToResponse(res, 201, message);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}
