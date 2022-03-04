import { PasswordResetModel } from "../prisma/models";
import { PasswordResetCreateInput, PasswordResetWhereUniqueInput } from "../@types/prisma/static.types";

export async function createPasswordReset(input: PasswordResetCreateInput) {
    return await PasswordResetModel.create({
        data: input,
    });
}

export async function findPasswordReset(input: PasswordResetWhereUniqueInput) {
    return await PasswordResetModel.findUnique({ where: input });
}

export async function deletePasswordReset(input: PasswordResetWhereUniqueInput) {
    if (await findPasswordReset(input)) await PasswordResetModel.delete({ where: input });
}
