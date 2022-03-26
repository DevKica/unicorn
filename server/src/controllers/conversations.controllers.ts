import { Request, Response } from "express";
import { deleteUserConversation, findAllUserConversations, findUserConversation, updateConversation } from "../services/conversations.services";
import { createMessage } from "../services/messages.services";
import { updateUsersRelation } from "../services/usersRelation.services";
import { applySuccessToResponse, applyToResponse, applyToResponseCustom } from "../utils/errors/applyToResponse";
import { Forbidden, NotFound } from "../utils/errors/main";

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
        const { conversationId, secondUserId } = req.params;

        if (userId === secondUserId) throw new Forbidden();

        if (!(await findUserConversation({ conversationId, userId: secondUserId }))) throw new NotFound();

        const result = await deleteUserConversation({ userId: userId, conversationId });

        if (!result.count) throw new NotFound();

        await updateUsersRelation(
            {
                relationType: "accepted",
                OR: [
                    { firstUserId: userId, secondUserId: secondUserId },
                    { firstUserId: secondUserId, secondUserId: userId },
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
