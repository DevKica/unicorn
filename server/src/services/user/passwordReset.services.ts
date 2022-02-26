import { PasswordResetModel } from "../../prisma/models";
import { PasswordResetCreateInput, PasswordResetWhereUniqueInput } from "../../@types/prisma/static.types";

export async function createPasswordReset(input: PasswordResetCreateInput) {
    const passwordResetObject = await PasswordResetModel.create({
        data: input,
    });
    return passwordResetObject;
}

export async function findPasswordReset(input: PasswordResetWhereUniqueInput) {
    const passwordResetObject = await PasswordResetModel.findUnique({ where: input });
    return passwordResetObject;
}

export async function deletePasswordReset(input: PasswordResetWhereUniqueInput) {
    PasswordResetModel.delete({ where: input });
}
