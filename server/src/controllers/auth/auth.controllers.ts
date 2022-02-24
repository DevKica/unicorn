import { Response } from "express";
import { CreateUserRequest } from "../../@types/routes/requests.types.";
import { signNewSession } from "../../services/session/session.services";
import { createUser } from "../../services/user/auth.services";
import { createEmailVerification } from "../../services/user/email.services";
import { sendVerificationEmailHandler } from "../../config/email.config";
import { applyToResponse, applyToResponseError } from "../../utils/errors/applyToResponse";
import { prepareCreateUserInput } from "./prepareUserCreateInput";
import checkEmailAvailability from "../../utils/user/auth/checkEmailAvalibility";

export async function createUserHandler(req: CreateUserRequest, res: Response): Promise<void> {
    try {
        await checkEmailAvailability(req.body.email);

        const preparedUser = prepareCreateUserInput(req.body);

        const createdUser = await createUser(preparedUser);

        const emailVerification = await createEmailVerification({ email: createdUser.email, user: { connect: { id: createdUser.id } } });

        sendVerificationEmailHandler(createdUser.email, {
            emailVerificationId: emailVerification.id,
        });

        await signNewSession({ req, res, id: createdUser.id, active: createdUser.active });

        applyToResponse(res, 201, createdUser);
    } catch (e: unknown) {
        applyToResponseError(res, e);
    }
}
