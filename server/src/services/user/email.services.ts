import { EmailVerificationModel } from "../../prisma/models";
import { EmailVerificationCreateInput, EmailVerificationType } from "../../@types/prisma/static.types";

export async function createEmailVerification(id: any, input: EmailVerificationCreateInput): Promise<EmailVerificationType> {
    const emailVerificationObject = await EmailVerificationModel.create({
        data: input,
        user: {
            //@ts-ignore
            connect: { id },
        },
    });
    return emailVerificationObject;
}
