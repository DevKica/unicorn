import { Request, Response } from "express";
import { findUniqueConversation } from "../services/conversations.services";
import { createMessage } from "../services/messages.services";
import { applySuccessToResponse, applyToResponse, applyToResponseCustom } from "../utils/errors/applyToResponse";
import { NotFound } from "../utils/errors/main";

export async function createTextMessageHandler(req: Request, res: Response): Promise<void> {
    try {
        const { userId } = res.locals.user;
        const { content, conversationId } = req.body;

        const conversation = await findUniqueConversation({ id: conversationId });

        if (!conversation) throw new NotFound();

        console.log(conversation);

        const message = await createMessage({
            content,
            user: {
                connect: { id: userId },
            },
            conversation: {
                connect: { id: conversationId },
            },
            type: "default",
        });

        applyToResponse(res, 201, message);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}

export async function createFileMessageHandler(req: Request, res: Response): Promise<void> {
    try {
        const { userId } = res.locals.user;
        const { type, conversationId } = req.body;
        applySuccessToResponse(res);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}
