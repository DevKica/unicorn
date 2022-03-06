import { Request, Response } from "express";
import { checkIfLikesRelationExists, deleteLike } from "../services/like.services";
import { checkIfUserExists } from "../services/user/auth.services";
import { applyToResponseCustom } from "../utils/errors/applyToResponse";
import { Forbidden } from "../utils/errors/main";

export async function createLikeHandler(req: Request, res: Response): Promise<void> {
    try {
        const { judgedUserId, typeOfLike } = req.body;
        const { userId, accountType } = res.locals.user;

        if (typeOfLike === "Super" && accountType === " Default") throw new Forbidden();

        await checkIfUserExists({ id: judgedUserId, active: true });

        if (await checkIfLikesRelationExists({ id: judgedUserId, userId })) {
            await deleteLike({ id: judgedUserId, userId });
        }
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}
