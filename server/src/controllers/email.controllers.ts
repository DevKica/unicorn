import { Request, Response } from "express";
import { LoginUserRequest, MainResponse } from "../@types/routes/requests.types.";
import { sendVerificationEmailHandler } from "../config/email.config";
import { verifyEmailTokenJWT } from "../config/jwt.config";
import { userProfileProperties } from "../prisma/validator";
import { deleteAllSessions } from "../services/session/session.services";
import { validateUserPassword } from "../services/user/auth.services";
import { createEmailVerification, deleteEmailVerification, findEmailVerification } from "../services/emailVerification.services";
import { deletePasswordReset } from "../services/passwordReset.services";
import { updateUniqueUser } from "../services/user/user.services";
import { applyToResponse, applyToResponseCustom, applySuccessToResponse } from "../utils/errors/applyToResponse";
import { InactiveLink, NotFound } from "../utils/errors/main";
import { SuccessResponse } from "../utils/responses/main";
import checkEmailAvailability from "../utils/user/auth/checkEmailAvalibility";

export async function verifyEmailHandler(req: Request, res: Response): Promise<void> {
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

export async function changeEmailHandler(req: LoginUserRequest, res: MainResponse): Promise<void> {
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

export async function resendVerificationEmailHandler(req: Request, res: Response): Promise<void> {
    try {
        const { userId, active } = res.locals.user;

        const emailVerification = await findEmailVerification({ userId });

        if (!emailVerification) throw new NotFound();

        if (!active) {
            sendVerificationEmailHandler(emailVerification.email, { objectId: emailVerification.id });
        } else {
            sendVerificationEmailHandler(emailVerification.email, {
                objectId: emailVerification.id,
                newEmail: emailVerification.email,
            });
        }

        applySuccessToResponse(res);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}
