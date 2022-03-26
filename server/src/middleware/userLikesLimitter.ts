import dayjs from "dayjs";
import { Request, Response, NextFunction } from "express";
import { findManyLikes } from "../services/like.services";
import { findManyUsersRelations } from "../services/usersRelation.services";
import { applyToResponseCustom } from "../utils/errors/applyToResponse";
import { NumberOfLikesExceeded } from "../utils/errors/main";
import { userLikesLimit } from "../validation/helpers/constants";

const gtPreviousDay = {
    createdAt: {
        gt: dayjs().subtract(12, "h").toISOString(),
    },
};

export async function userLikesLimitter(_req: Request, res: Response, next: NextFunction) {
    try {
        const { userId, accountType } = res.locals.user;

        if (accountType !== "default") return next();

        const likes = await findManyLikes({
            userId,
            ...gtPreviousDay,
        });
        const relations = await findManyUsersRelations({
            firstUserId: userId,
            relationType: { in: ["accepted", "rejected"] },
            ...gtPreviousDay,
        });

        if (likes.length + relations.length > userLikesLimit) throw new NumberOfLikesExceeded();

        next();
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}
