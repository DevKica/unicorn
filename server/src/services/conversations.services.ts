import { Prisma } from "@prisma/client";
import { ConversationCreateInput, ConversationUpdateInput } from "../@types/prisma/static.types";
import { ConversationModel } from "../prisma/models";

export async function createConversation(data: ConversationCreateInput) {
    const conversation = await ConversationModel.create({
        data,
        include: {
            messages: true,
        },
    });
    return conversation;
}

export async function findUserConversation({ conversationId, userId }: { conversationId: string; userId: string }) {
    const conversation = await ConversationModel.findFirst({
        where: {
            id: conversationId,
            members: {
                some: {
                    id: userId,
                },
            },
        },
    });
    return conversation;
}

export async function findAllUserConversations(userId: string) {
    const conversations = await ConversationModel.findMany({
        where: {
            members: {
                some: {
                    id: userId,
                },
            },
        },
        include: {
            members: {
                select: {
                    id: true,
                    name: true,
                    surname: true,
                },
                orderBy: {
                    createdAt: "asc",
                },
            },
            messages: {
                select: {
                    id: true,
                    userId: true,
                    content: true,
                    type: true,
                    isDeleted: true,
                    createdAt: true,
                },
                orderBy: {
                    createdAt: "asc",
                },
            },
        },
        orderBy: {
            updatedAt: "desc",
        },
    });
    return conversations;
}

export async function updateConversation({ conversationId, userId }: { conversationId: string; userId: string }, data: ConversationUpdateInput) {
    const conversation = await ConversationModel.updateMany({
        where: {
            id: conversationId,
            members: {
                some: {
                    id: userId,
                },
            },
        },
        data,
    });
    return conversation;
}

export async function deleteUserConversation({ conversationId, userId }: { conversationId: string; userId: string }): Promise<Prisma.BatchPayload> {
    const result = await ConversationModel.deleteMany({
        where: {
            id: conversationId,
            members: {
                some: {
                    id: userId,
                },
            },
        },
    });
    return result;
}
