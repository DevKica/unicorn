import { Request, Response } from "express";
import { sendResetPasswordEmailHandler } from "../config/email.config";
import { verifyEmailTokenJWT } from "../config/jwt.config";
import { deleteAllSessions } from "../services/session/session.services";
import { validateUserPassword } from "../services/user/auth.services";
import { createPasswordReset, deletePasswordReset, findPasswordReset } from "../services/passwordReset.services";
import { updateUniqueUser, findUniqueUser } from "../services/user/user.services";
import { applySuccessToResponse, applyToResponseCustom } from "../utils/errors/applyToResponse";
import { InactiveLink, NotFound } from "../utils/errors/main";
import { ChangePasswordRequest } from "./../@types/routes/requests.types.";

export async function changePasswordHandler(req: ChangePasswordRequest, res: Response): Promise<void> {
    try {
        const { userId: id } = res.locals.user;
        const { oldPassword, password } = req.body;

        await validateUserPassword(oldPassword, { id });

        await updateUniqueUser({ id }, { password });

        await deleteAllSessions({ userId: id }, res);

        applySuccessToResponse(res);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}

export async function sendPasswordResetEmailHandler(req: Request, res: Response) {
    try {
        const { email } = req.body;

        const user = await findUniqueUser({ email }, { id: true });
        if (!user) throw new NotFound();

        await deletePasswordReset({ userId: user.id });

        const passwordReset = await createPasswordReset({ user: { connect: { id: user.id } } });

        sendResetPasswordEmailHandler(email, { objectId: passwordReset.id });

        applySuccessToResponse(res);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}
export async function verifySetNewPasswordLinkHandler(req: Request, res: Response) {
    try {
        const { objectId } = verifyEmailTokenJWT(req.params.token);
        const passwordReset = findPasswordReset({ id: objectId });

        if (!passwordReset) throw new InactiveLink();

        applySuccessToResponse(res);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}

export async function setNewPasswordHandler(req: Request, res: Response) {
    try {
        const { objectId } = verifyEmailTokenJWT(req.params.token);

        const passwordReset = await findPasswordReset({ id: objectId });

        if (!passwordReset) throw new InactiveLink();

        const user = await updateUniqueUser({ id: passwordReset.userId }, { password: req.body.password });

        if (!user.active) {
            await updateUniqueUser({ id: user.id }, { active: true });
        }
        if (!user) return;

        await deleteAllSessions({ id: user.id }, res);

        await deletePasswordReset({ id: objectId });

        applySuccessToResponse(res);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}
