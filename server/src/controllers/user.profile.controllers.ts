import { Request, Response } from "express";
import { userProfileProperties } from "../prisma/validator";
import { findUniqueUser } from "../services/user/user.services";
import { applyToResponseCustom, applyToResponse } from "../utils/errors/applyToResponse";

export async function getUserPrivateInfoHandler(req: Request, res: Response): Promise<void> {
    try {
        const { userId } = res.locals.user;

        const user = await findUniqueUser({ id: userId }, userProfileProperties);

        if (!user) throw Error;

        applyToResponse(res, 200, user);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}
