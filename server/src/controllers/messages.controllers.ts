import path from "path";
import { existsSync } from "fs";
import { Request, Response } from "express";
import { photoMessagesPath, videoMessagesPath, voiceMessagesPath } from "../config/upload.config";
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

export async function getFileMessageContentHandler(req: Request, res: Response): Promise<void> {
    try {
        const { type, fileName } = req.params;

        let filePath: string = "";

        switch (type) {
            case "photo":
                filePath = path.join(photoMessagesPath, `${fileName}.jpg`);
                break;
            case "voice":
                filePath = path.join(voiceMessagesPath, `${fileName}.mp3`);
                break;
            case "video":
                filePath = path.join(videoMessagesPath, `${fileName}.mp4`);
                break;
        }

        if (!existsSync(filePath)) throw new NotFound();

        return res.sendFile(filePath);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}
