import { Response } from "express";
import { deleteAllSessions } from "../services/session/session.services";
import { updateUniqueUser, validateUserPassword } from "../services/user/auth.services";
import { applySuccessToResponse, applyToResponse, applyToResponseCustom } from "../utils/errors/applyToResponse";
import { ChangePasswordRequest } from "./../@types/routes/requests.types.";

export async function changePasswordHandler(req: ChangePasswordRequest, res: Response): Promise<void> {
    try {
        const { userId: id } = res.locals.user;
        const { oldPassword, password } = req.body;

        await validateUserPassword(oldPassword, { id });

        await updateUniqueUser({ id }, { password });

        await deleteAllSessions({ userId: id }, res);

        console.log("tuuuuuuuuuuu");

        applySuccessToResponse(res);
    } catch (e: unknown) {
        applyToResponseCustom(res, e);
    }
}
