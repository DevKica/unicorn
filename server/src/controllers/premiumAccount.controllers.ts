import argon2 from "argon2";
import { Request, Response } from "express";
import { NotFound } from "../utils/errors/main";
import { userProfileProperties } from "../prisma/validator";
import { deleteUniquePremiumAccountToken, findUniquePremiumAccountToken } from "../services/premiumAccountToken.services";
import { deleteAllSessions, signNewSession } from "../services/session/session.services";
import { updateUniqueUser } from "../services/user/user.services";
import { applyToResponse, applyToResponseCustom } from "../utils/errors/applyToResponse";
import dayjs from "dayjs";

export async function activatePremiumAccountHandler(req: Request, res: Response) {
    try {
        const { token, id } = req.params;
        const { userId } = res.locals.user;

        const premiumAccountToken = await findUniquePremiumAccountToken({ id });

        if (!premiumAccountToken || !(await argon2.verify(premiumAccountToken.token, token))) throw new NotFound();

        const subExpiration = dayjs().add(premiumAccountToken.daysOfValidity, "day").toDate();

        const updatedUser = await updateUniqueUser({ id: userId }, { accountType: premiumAccountToken.accountType, subExpiration }, userProfileProperties);

        await deleteUniquePremiumAccountToken({ id });

        await deleteAllSessions({ userId }, res);

        await signNewSession({ req, res, id: updatedUser.id, active: updatedUser.active, accountType: updatedUser.accountType, subExpiration: updatedUser.subExpiration });

        applyToResponse(res, 200, updatedUser);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}
