import { Response, Request } from "express";
import { CreateUserRequest, LoginUserRequest } from "../../@types/routes/requests.types.";
import { deleteAllSessions, deleteSingleSession, signNewSession } from "../../services/session/session.services";
import { createEmailVerification } from "../../services/user/emailVerification.services";
import { sendVerificationEmailHandler } from "../../config/email.config";
import { prepareCreateUserInput } from "../../utils/user/auth/prepareUserCreateInput";
import checkEmailAvailability from "../../utils/user/auth/checkEmailAvalibility";
import { uploadUserPhotosFromReq } from "../../utils/user/upload/uploadToDir";
import { SuccessResponse } from "../../utils/responses/main";
import { validateUserPassword } from "../../services/user/auth.services";
import { createUser } from "../../services/user/user.services";
import { applyToResponse, applyToResponseCustom, applySuccessToResponse } from "../../utils/errors/applyToResponse";

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
            objectId: emailVerification.id,
        });

        await signNewSession({ req, res, id: createdUser.id, active: createdUser.active, accountType: createdUser.accountType, subExpiration: createdUser.subExpiration });

        applyToResponse(res, 201, { ...createdUser, photos: uploadPhotos });
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}

export async function loginUserHandler(req: LoginUserRequest, res: Response): Promise<void> {
    try {
        const user = await validateUserPassword(req.body.password, { email: req.body.email });
        await signNewSession({ req, res, id: user.id, active: user.active, accountType: user.accountType, subExpiration: user.subExpiration });
        applyToResponse(res, 200, user);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}

export async function deleteSingleSessionHandler(_req: Request, res: Response): Promise<void> {
    try {
        const { sessionId } = res.locals.user;

        await deleteSingleSession({ id: sessionId }, res);

        applySuccessToResponse(res);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}

export async function deleteAllSessionHandler(_req: Request, res: Response): Promise<void> {
    try {
        const { userId } = res.locals.user;

        await deleteAllSessions({ userId }, res);

        applySuccessToResponse(res);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}
