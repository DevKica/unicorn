import { Request, Response } from "express";
import { findUserConversation } from "../services/conversations.services";
import { createMessage } from "../services/messages.services";
import { applyToResponse, applyToResponseCustom } from "../utils/errors/applyToResponse";
import { NotFound } from "../utils/errors/main";
import { uploadFileMessage } from "../utils/user/upload/uploadToDir";

export async function createTextMessageHandler(req: Request, res: Response): Promise<void> {
    try {
        const { userId } = res.locals.user;
        const { content, conversationId } = req.body;

        const conversation = await findUserConversation(conversationId, userId);

        if (!conversation) throw new NotFound();

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

        const conversation = await findUserConversation(conversationId, userId);

        if (!conversation) throw new NotFound();

        const fileName = await uploadFileMessage(req, type);

        const message = await createMessage({
            content: fileName,
            user: {
                connect: { id: userId },
            },
            conversation: {
                connect: { id: conversationId },
            },
            type,
        });

        applyToResponse(res, 201, message);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}
