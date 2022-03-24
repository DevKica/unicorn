import argon2 from "argon2";
import { Request, Response } from "express";
import { userProfileProperties } from "../prisma/validator";
import { findUniquePremiumAccountToken } from "../services/premiumAccountToken.services";
import { deleteAllSessions, signNewSession } from "../services/session/session.services";
import { updateUniqueUser } from "../services/user/user.services";
import { applySuccessToResponse, applyToResponseCustom } from "../utils/errors/applyToResponse";
// import { applySuccessToResponse, applyToResponse, applyToResponseCustom } from "../utils/errors/applyToResponse";
import { NotFound } from "../utils/errors/main";

export async function activatePremiumAccountHandler(req: Request, res: Response) {
    try {
        const { token, id } = req.params;
        const { userId } = res.locals.user;

        const premiumAccountToken = await findUniquePremiumAccountToken({ id });

        if (!premiumAccountToken) throw new NotFound();

        if (!(await argon2.verify(premiumAccountToken.token, token))) throw new NotFound();

        const subExpiration = new Date();
        subExpiration.setDate(subExpiration.getDate() + premiumAccountToken.daysOfValidity);

        const updatedUser = await updateUniqueUser({ id: userId }, { accountType: premiumAccountToken.accountType, subExpiration }, userProfileProperties);

        await deleteAllSessions({ userId }, res);

        await signNewSession({ req, res, id: updatedUser.id, active: updatedUser.active, accountType: updatedUser.accountType, subExpiration: updatedUser.subExpiration });

        applySuccessToResponse(res);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}
