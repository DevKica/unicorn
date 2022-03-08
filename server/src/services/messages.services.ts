import { MessageModel } from "../prisma/models";
import { MessageCreateInput, MessageUpdateInput, MessageWhereInput, MessageWhereUniqueInput } from "../@types/prisma/static.types";

export async function createMessage(data: MessageCreateInput) {
    return await MessageModel.create({ data });
}

export async function findUniqueMessage(where: MessageWhereUniqueInput) {
    return await MessageModel.findUnique({ where });
}

export async function findManyMessages(where: MessageWhereInput) {
    return await MessageModel.findMany({ where });
}

export async function updateUniqueMessage(where: MessageWhereUniqueInput, data: MessageUpdateInput) {
    return await MessageModel.update({ where, data });
}
