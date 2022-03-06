import { ConversationCreateInput, ConversationType } from "../@types/prisma/static.types";
import { ConversationModel } from "../prisma/models";

export async function createConversation(data: ConversationCreateInput) {
    return await ConversationModel.create({ data });
}
