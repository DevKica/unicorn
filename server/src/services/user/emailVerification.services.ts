import { EmailVerificationModel } from "../../prisma/models";
import { EmailVerificationCreateInput, EmailVerificationWhereUniqueInput } from "../../@types/prisma/static.types";

export async function createEmailVerification(input: EmailVerificationCreateInput) {
    const emailVerificationObject = await EmailVerificationModel.create({
        data: input,
    });
    return emailVerificationObject;
}

export async function findEmailVerification(input: EmailVerificationWhereUniqueInput) {
    const emailVerificationObject = await EmailVerificationModel.findUnique({ where: input });
    return emailVerificationObject;
}

export async function deleteEmailVerification(input: EmailVerificationWhereUniqueInput) {
    EmailVerificationModel.delete({ where: input });
}
