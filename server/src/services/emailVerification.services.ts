import { EmailVerificationModel } from "../prisma/models";
import { EmailVerificationCreateInput, EmailVerificationWhereUniqueInput } from "../@types/prisma/static.types";

export async function createEmailVerification(input: EmailVerificationCreateInput) {
    const emailVerification = await EmailVerificationModel.create({
        data: input,
    });
    return emailVerification;
}
export async function findEmailVerification(input: EmailVerificationWhereUniqueInput) {
    const emailVerification = await EmailVerificationModel.findUnique({ where: input });
    return emailVerification;
}
export async function deleteEmailVerification(input: EmailVerificationWhereUniqueInput) {
    if (await findEmailVerification(input)) await EmailVerificationModel.delete({ where: input });
}
