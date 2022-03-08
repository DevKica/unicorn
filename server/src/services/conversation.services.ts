import { ConversationCreateInput, ConversationUpdateInput, ConversationWhereUniqueInput } from "../@types/prisma/static.types";
import { ConversationModel } from "../prisma/models";

export async function createConversation(data: ConversationCreateInput) {
    return await ConversationModel.create({
        data,
        include: {
            messages: true,
        },
    });
}

export async function findUniqueConversation(where: ConversationWhereUniqueInput) {
    return await ConversationModel.findUnique({ where });
}

export async function updateUniqueConversation(where: ConversationWhereUniqueInput, data: ConversationUpdateInput) {
    return await ConversationModel.update({ where, data });
}
