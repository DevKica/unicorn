import { Response, Request } from "express";
import { CreateUserRequest, LoginUserRequest } from "../../@types/routes/requests.types.";
import { signNewSession } from "../../services/session/session.services";
import { createUser, validateUserPassword } from "../../services/user/auth.services";
import { createEmailVerification } from "../../services/user/email.services";
import { sendVerificationEmailHandler } from "../../config/email.config";
import { applyToResponse, applyToResponseError } from "../../utils/errors/applyToResponse";
import { prepareCreateUserInput } from "./prepareUserCreateInput";
import checkEmailAvailability from "../../utils/user/auth/checkEmailAvalibility";
import { uploadUserPhotosFromReq } from "../../utils/user/upload/uploadToDir";
import { SuccessResponse } from "../../utils/responses/main";

export async function returnSuccess(_req: Request, res: Response): Promise<void> {
    applyToResponse(res, 200, SuccessResponse);
}

export async function createUserHandler(req: CreateUserRequest, res: Response): Promise<void> {
    try {
        await checkEmailAvailability(req.body.email);

        const uploadPhotos = await uploadUserPhotosFromReq(req);

        const preparedUser = prepareCreateUserInput(req.body);

        const createdUser = await createUser(preparedUser);

        const emailVerification = await createEmailVerification({ email: createdUser.email, user: { connect: { id: createdUser.id } } });

        sendVerificationEmailHandler(createdUser.email, {
            emailVerificationId: emailVerification.id,
        });

        await signNewSession({ req, res, id: createdUser.id, active: createdUser.active });

        applyToResponse(res, 201, { ...createdUser, photos: uploadPhotos });
    } catch (e: unknown) {
        applyToResponseError(res, e);
    }
}

export async function loginUserHandler(req: LoginUserRequest, res: Response): Promise<void> {
    try {
        const user = await validateUserPassword(req.body.password, { email: req.body.email });
        await signNewSession({ req, res, id: user.id, active: user.active });
        applyToResponse(res, 200, user);
    } catch (e: unknown) {
        applyToResponseError(res, e);
    }
}
