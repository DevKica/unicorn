import { Request, Response } from "express";
import { findAllUserConversations, updateConversation, checkIfConversationExists, deleteUserConversation } from "../services/conversations.services";
import { createMessage } from "../services/messages.services";
import { updateUsersRelation } from "../services/usersRelation.services";
// import { updateUsersRelation } from "../services/usersRelation.services";
import { applySuccessToResponse, applyToResponse, applyToResponseCustom } from "../utils/errors/applyToResponse";
import { NotFound } from "../utils/errors/main";
import { removeFileMessage } from "../utils/user/upload/uploadToDir";

export async function getConversationsHandler(_req: Request, res: Response): Promise<void> {
    try {
        const { userId } = res.locals.user;

        const conversations = await findAllUserConversations(userId);

        applyToResponse(res, 200, conversations);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}

export async function renameConversationHandler(req: Request, res: Response): Promise<void> {
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

export async function deleteConversationHandler(req: Request, res: Response): Promise<void> {
    try {
        const { userId } = res.locals.user;
        const { conversationId } = req.params;

        await checkIfConversationExists({
            id: conversationId,
            members: {
                some: {
                    id: userId,
                },
            },
        });

        const conversation = await deleteUserConversation({ id: conversationId });

        conversation.messages.forEach((e: { type: string; content: string }) => {
            removeFileMessage(e.type, e.content);
        });

        await updateUsersRelation(
            {
                relationType: "accepted",
                OR: [
                    { firstUserId: userId, secondUserId: conversation.members[0].id },
                    { firstUserId: conversation.members[0].id, secondUserId: userId },
                ],
            },
            {
                relationType: "removed",
            }
        );

        applySuccessToResponse(res);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}
