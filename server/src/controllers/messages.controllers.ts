import { Request, Response } from "express";
import { createMessage, findUniqueMessage, updateUniqueMessage } from "../services/messages.services";
import { applyToResponse, applyToResponseCustom } from "../utils/errors/applyToResponse";
import { getFileMessagePath, removeFileMessage, uploadFileMessage } from "../utils/user/upload/uploadToDir";
import { checkIfConversationExists } from "../services/conversations.services";
import { Forbidden } from "../utils/errors/main";

export async function createTextMessageHandler(req: Request, res: Response): Promise<void> {
    try {
        const { userId } = res.locals.user;
        const { content, conversationId } = req.body;

        await checkIfConversationExists({
            id: conversationId,
            members: {
                some: {
                    id: userId,
                },
            },
        });

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

        await checkIfConversationExists({
            id: conversationId,
            members: {
                some: {
                    id: userId,
                },
            },
        });

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

export async function getFileMessageContentHandler(req: Request, res: Response): Promise<void> {
    try {
        const { type, fileName } = req.params;

        const filePath = getFileMessagePath(type, fileName);

        return res.sendFile(filePath);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}

export async function deleteMessageHandler(req: Request, res: Response): Promise<void> {
    try {
        const { messageId } = req.body;
        const { userId } = res.locals.user;

        const message = await findUniqueMessage({ id: messageId });

        if (!message || message.userId !== userId || message.isDeleted || message.type === "info") throw new Forbidden();

        if (message.type !== "default") removeFileMessage(message.type, message.content);

        const newMessage = await updateUniqueMessage({ id: messageId }, { isDeleted: true, content: "", type: "default" });

        applyToResponse(res, 200, newMessage);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}
