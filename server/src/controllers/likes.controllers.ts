import { UsersRelation } from "@prisma/client";
import { Request, Response } from "express";
import { LikeModel } from "../prisma/models";
import { createConversation } from "../services/conversation.services";
import { createLike, deleteLike, findLike } from "../services/like.services";
import { checkIfActiveUserExists } from "../services/user/auth.services";
import { findUniqueUser } from "../services/user/user.services";
import { createUsersRelations } from "../services/usersRelation.services";
import { applySuccessToResponse, applyToResponse, applyToResponseCustom } from "../utils/errors/applyToResponse";
import { Forbidden, UpgradeYourAccount } from "../utils/errors/main";

export async function createLikeHandler(req: Request, res: Response): Promise<void> {
    try {
        const { judgedUserId, typeOfLike } = req.body;
        const { userId, accountType } = res.locals.user;

        // throw Forbidden if the user doesn't have enough permissions to give super likes
        if (typeOfLike === "super" && accountType === "default") throw new UpgradeYourAccount();

        // check if the liked user exists and have verified email
        const judgedUser = await checkIfActiveUserExists({ id: judgedUserId }, { name: true });

        // get user local object
        const user = await findUniqueUser({ id: userId }, { name: true });

        // check if the user has already made such a request
        const alreadyLiked = await findLike({ userId, judgedUserId });

        // if the user doesn't exists (hopefully it never does) or has already made this request
        if (!user || alreadyLiked) throw new Forbidden();

        // check if the judged user likes the user
        const likeObject = await findLike({ userId: judgedUserId, judgedUserId: userId });

        // if yes
        if (likeObject) {
            // delete currently stored likeObject
            await deleteLike({ id: likeObject.id });

            // relationType depends on typeOfLike
            let relationType: UsersRelation["relationType"];

            // positive
            if (likeObject.typeOfLike !== "notInterested") {
                relationType = "accepted";
                // create conversation between users
                const conversation = await createConversation({
                    name: `${user.name} and ${judgedUser.name}`,
                    members: {
                        connect: [{ id: userId }, { id: judgedUserId }],
                    },
                });
                console.log(conversation);
                applyToResponse(res, 201, conversation);
            }
            // negative
            else {
                relationType = "rejected";
                applySuccessToResponse(res);
            }

            // create users relation
            await createUsersRelations({
                relationType,
                firstUser: {
                    connect: { id: userId },
                },
                secondUser: {
                    connect: { id: judgedUserId },
                },
            });
            // if no, create new like and return success
        } else {
            await createLike({
                user: {
                    connect: { id: userId },
                },
                judgedUser: {
                    connect: { id: judgedUserId },
                },
                typeOfLike,
            });
            applySuccessToResponse(res);
        }
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}
