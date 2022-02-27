import { Request, Response } from "express";
import { sendResetPasswordEmailHandler } from "../config/email.config";
import { deleteAllSessions } from "../services/session/session.services";
import { findUniqueUser, updateUniqueUser, validateUserPassword } from "../services/user/auth.services";
import { createPasswordReset, deletePasswordReset } from "../services/user/passwordReset.services";
import { applySuccessToResponse, applyToResponse, applyToResponseCustom } from "../utils/errors/applyToResponse";
import { NotFound } from "../utils/errors/main";
import { ChangePasswordRequest } from "./../@types/routes/requests.types.";

export async function changePasswordHandler(req: ChangePasswordRequest, res: Response): Promise<void> {
    try {
        const { userId: id } = res.locals.user;
        const { oldPassword, password } = req.body;

        await validateUserPassword(oldPassword, { id });

        await updateUniqueUser({ id }, { password });

        await deleteAllSessions({ userId: id }, res);

        applySuccessToResponse(res);
    } catch (e: unknown) {
        applyToResponseCustom(res, e);
    }
}

export async function sendPasswordResetEmailHandler(req: Request, res: Response) {
    try {
        const { email } = req.body;

        const user = await findUniqueUser({ email }, { id: true });
        if (!user) throw new NotFound();

        await deletePasswordReset({ id: user.id });

        const passwordReset = await createPasswordReset({ user: { connect: { id: user.id } } });

        sendResetPasswordEmailHandler(email, { objectId: passwordReset.id });

        applySuccessToResponse(res);
    } catch (e: unknown) {
        applyToResponseCustom(res, e);
    }
}
