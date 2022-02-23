import { Response } from "express";
import { CreateUserRequest } from "../../@types/routes/requests.types.";
import { checkEmailAvailability } from "../../helpers/user/checkEmailAvalibility";
import { createUser } from "../../services/user/auth.services";
import { createEmailVerification } from "../../services/user/email.services";
import { applyToResponse, applyToResponseError } from "../../utils/errors/applyToResponse";
import { prepareCreateUserInput } from "./prepareUserCreateInput";

export async function createUserHandler(req: CreateUserRequest, res: Response) {
    try {
        await checkEmailAvailability(req.body.email);

        const preparedUser = prepareCreateUserInput(req.body);

        const createdUser = await createUser(preparedUser);

        const emailVerification = await createEmailVerification({ email: createdUser.email, user: { connect: { id: createdUser.id } } });

        applyToResponse(res, 201, createdUser);
    } catch (e: unknown) {
        console.log(e);
        applyToResponseError(res, e);
    }
}
