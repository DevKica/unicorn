import { MessageModel } from "../prisma/models";
import { MessageCreateInput, MessageUpdateInput, MessageWhereInput, MessageWhereUniqueInput } from "../@types/prisma/static.types";

export async function createMessage(data: MessageCreateInput) {
    const message = await MessageModel.create({ data });
    return message;
}

export async function findUniqueMessage(where: MessageWhereUniqueInput) {
    const message = await MessageModel.findUnique({ where });
    return message;
}

export async function findManyMessages(where: MessageWhereInput) {
    const message = await MessageModel.findMany({ where });
    return message;
}

export async function updateUniqueMessage(where: MessageWhereUniqueInput, data: MessageUpdateInput) {
    const message = await MessageModel.update({ where, data });
    return message;
}
