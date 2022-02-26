import { Request, Response } from "express";
import { verifyEmailTokenJWT } from "../config/jwt.config";
import { updateUniqueUser } from "../services/user/auth.services";
import { deleteEmailVerification, findEmailVerification } from "../services/user/email.services";
import { applyToResponse, applyToResponseError } from "../utils/errors/applyToResponse";
import { InactiveLink } from "../utils/errors/main";
import { SuccessResponse } from "../utils/responses/main";
import checkEmailAvailability from "../utils/user/auth/checkEmailAvalibility";

export async function verifyEmailHandler(req: Request, res: Response) {
    try {
        const { newEmail, objectId } = verifyEmailTokenJWT(req.params.token);

        const emailVerification = await findEmailVerification({ id: objectId });

        if (!emailVerification) throw new InactiveLink();

        await deleteEmailVerification({ id: objectId });

        if (newEmail) {
            await checkEmailAvailability(newEmail);

            await updateUniqueUser({ id: emailVerification.userId }, { email: newEmail });

            return applyToResponse(res, 200, SuccessResponse);
        }

        await updateUniqueUser({ id: emailVerification.userId }, { active: true });

        applyToResponse(res, 200, SuccessResponse);
    } catch (e: unknown) {
        applyToResponseError(res, e);
    }
}
