import { EmailVerificationModel } from "../../prisma/models";
import { EmailVerificationCreateInput, EmailVerificationType } from "../../@types/prisma/static.types";

export async function createEmailVerification(input: EmailVerificationCreateInput): Promise<EmailVerificationType> {
    const emailVerificationObject = await EmailVerificationModel.create({
        data: input,
    });
    return emailVerificationObject;
}
