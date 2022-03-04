import { EmailVerificationModel } from "../prisma/models";
import { EmailVerificationCreateInput, EmailVerificationWhereUniqueInput } from "../@types/prisma/static.types";

export async function createEmailVerification(input: EmailVerificationCreateInput) {
    return await EmailVerificationModel.create({
        data: input,
    });
}
export async function findEmailVerification(input: EmailVerificationWhereUniqueInput) {
    return await EmailVerificationModel.findUnique({ where: input });
}
export async function deleteEmailVerification(input: EmailVerificationWhereUniqueInput) {
    if (await findEmailVerification(input)) await EmailVerificationModel.delete({ where: input });
}
