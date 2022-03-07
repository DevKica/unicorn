import { Request, Response } from "express";
import { createUsersRelations } from "../services/usersRelation.services";
import { applySuccessToResponse, applyToResponseCustom } from "../utils/errors/applyToResponse";

export async function createRejectedUsersRelation(req: Request, res: Response): Promise<void> {
    try {
        const { rejectedUserId } = req.query;
        const { userId } = res.locals.user;

        await createUsersRelations({
            relationType: "rejected",
            firstUser: {
                connect: { id: userId },
            },
            secondUser: {
                connect: { id: rejectedUserId as string },
            },
        });

        applySuccessToResponse(res);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}
