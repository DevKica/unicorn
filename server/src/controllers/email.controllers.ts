import { Request, Response } from "express";
import { LoginUserRequest, MainResponse } from "../@types/routes/requests.types.";
import { sendVerificationEmailHandler } from "../config/email.config";
import { verifyEmailTokenJWT } from "../config/jwt.config";
import { userProfileProperties } from "../prisma/validator";
import { deleteAllSessions } from "../services/session/session.services";
import { updateUniqueUser, validateUserPassword } from "../services/user/auth.services";
import { createEmailVerification, deleteEmailVerification, findEmailVerification } from "../services/user/emailVerification.services";
import { deletePasswordReset } from "../services/user/passwordReset.services";
import { applyToResponse, applyToResponseCustom } from "../utils/errors/applyToResponse";
import { InactiveLink } from "../utils/errors/main";
import { SuccessResponse } from "../utils/responses/main";
import checkEmailAvailability from "../utils/user/auth/checkEmailAvalibility";
import { removeAuthCookies } from "../utils/user/auth/cookiesHelper";

export async function verifyEmailHandler(req: Request, res: Response) {
    try {
        const { newEmail, objectId } = verifyEmailTokenJWT(req.params.token);

        const emailVerification = await findEmailVerification({ id: objectId });

        if (!emailVerification) throw new InactiveLink();

        if (newEmail) {
            await checkEmailAvailability(newEmail);

            await updateUniqueUser({ id: emailVerification.userId }, { email: newEmail });
        } else {
            await updateUniqueUser({ id: emailVerification.userId }, { active: true });
        }

        await deleteAllSessions({ userId: emailVerification.userId }, res);

        await deleteEmailVerification({ id: objectId });

        applyToResponse(res, 200, SuccessResponse);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}

export async function changeEmailHandler(req: LoginUserRequest, res: MainResponse) {
    try {
        const { userId, active } = res.locals.user;

        const { email, password } = req.body;

        await validateUserPassword(password, { id: userId });

        await checkEmailAvailability(email);

        await deleteEmailVerification({ userId });

        await deletePasswordReset({ userId });

        const emailVerification = await createEmailVerification({ email, user: { connect: { id: userId } } });

        if (!active) {
            sendVerificationEmailHandler(email, { objectId: emailVerification.id });
            const user = await updateUniqueUser({ id: userId }, { email }, userProfileProperties);
            return applyToResponse(res, 200, user);
        }
        sendVerificationEmailHandler(email, {
            objectId: emailVerification.id,
            newEmail: email,
        });
        applyToResponse(res, 200, SuccessResponse);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}
