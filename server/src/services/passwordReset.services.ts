import { PasswordResetModel } from "../prisma/models";
import { PasswordResetCreateInput, PasswordResetWhereUniqueInput } from "../@types/prisma/static.types";

export async function createPasswordReset(input: PasswordResetCreateInput) {
    const passwordReset = await PasswordResetModel.create({
        data: input,
    });
    return passwordReset;
}

export async function findPasswordReset(input: PasswordResetWhereUniqueInput) {
    const passwordReset = await PasswordResetModel.findUnique({ where: input });
    return passwordReset;
}

export async function deletePasswordReset(input: PasswordResetWhereUniqueInput) {
    if (await findPasswordReset(input)) await PasswordResetModel.delete({ where: input });
}
