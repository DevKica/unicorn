import dayjs from "dayjs";
import { UsersRelationStatus } from "@prisma/client";
import { Request, Response } from "express";
import { createConversation } from "../services/conversations.services";
import { createLike, deleteLike, findSingleLike } from "../services/like.services";
import { checkIfActiveUserExists } from "../services/user/auth.services";
import { findUniqueUser, updateUniqueUser } from "../services/user/user.services";
import { createUsersRelations, deleteUniqueUsersRelation, findUsersRelation } from "../services/usersRelation.services";
import { applySuccessToResponse, applyToResponse, applyToResponseCustom } from "../utils/errors/applyToResponse";
import { UpgradeYourAccount, Forbidden, ServerError, CannotRewindNewPair, RewindOnlyLastLikedUser } from "../utils/errors/main";
import { superLikesLimit } from "./../validation/helpers/constants";

export async function createLikeHandler(req: Request, res: Response): Promise<void> {
    try {
        const { judgedUserId, typeOfLike } = req.body;
        const { userId, accountType } = res.locals.user;

        // throw Forbidden if the user doesn't have enough permissions to give super likes
        if (typeOfLike === "super" && accountType === "default") throw new UpgradeYourAccount();

        // check if the judged user exists and have verified email
        const judgedUser = await checkIfActiveUserExists({ id: judgedUserId }, { name: true });

        // check that users are not already in a relation
        const usersRelation = await findUsersRelation({
            OR: [
                { firstUserId: userId, secondUserId: judgedUserId },
                { firstUserId: judgedUserId, secondUserId: userId },
            ],
        });

        if (usersRelation) throw new Forbidden();

        // local user
        const user = await findUniqueUser({ id: userId }, { name: true, superlikesLastDates: true });

        const alreadyLiked = await findSingleLike({ userId, judgedUserId });

        // if the user does not exists (hopefully it never does) or has already made this request
        if (!user || alreadyLiked) throw new Forbidden();

        if (typeOfLike === "super") {
            const last7daysSuperLikes = user.superlikesLastDates.filter((e) => e < dayjs().subtract(7, "d").toDate());

            if (last7daysSuperLikes.length > superLikesLimit) throw new UpgradeYourAccount();

            //flag
            if (process.env.NODE_ENV === "test") {
                last7daysSuperLikes.push(dayjs().subtract(7, "d").toDate());
            } else {
                last7daysSuperLikes.push(dayjs().toDate());
            }

            await updateUniqueUser(
                { id: userId },
                {
                    superlikesLastDates: last7daysSuperLikes,
                    lastLikedUserId: `super-${judgedUserId}`,
                }
            );
        } else {
            await updateUniqueUser({ id: userId }, { lastLikedUserId: `-${judgedUserId}` });
        }

        // check if the judged user has already liked the user
        const likeObject = await findSingleLike({ userId: judgedUserId, judgedUserId: userId });

        // if not, create a new like and return success
        if (!likeObject) {
            await createLike({
                user: {
                    connect: { id: userId },
                },
                judgedUser: {
                    connect: { id: judgedUserId },
                },
                typeOfLike,
            });

            return applySuccessToResponse(res);
        }

        // delete currently stored likeObject
        await deleteLike({ id: likeObject.id });

        // relationType depends on typeOfLike
        let relationType: UsersRelationStatus;

        // if both users rated each other positively
        if (likeObject.typeOfLike !== "notInterested" && typeOfLike !== "notInterested") {
            relationType = "accepted";
            // create conversation between users
            const conversation = await createConversation({
                name: `${user.name} and ${judgedUser.name}`,
                members: {
                    connect: [{ id: userId }, { id: judgedUserId }],
                },
            });
            applyToResponse(res, 201, conversation);
        } else {
            // if one of the users has not rated the other positively
            relationType = "rejected";
            applySuccessToResponse(res);
        }

        // create relation between users
        await createUsersRelations({
            relationType,
            firstUser: {
                connect: { id: userId },
            },
            secondUser: {
                connect: { id: judgedUserId },
            },
        });
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}

export async function rewindLikeHandler(_req: Request, res: Response): Promise<void> {
    try {
        const { userId } = res.locals.user;

        const user = await findUniqueUser({ id: userId }, { lastLikedUserId: true, superlikesLastDates: true });

        if (!user) throw new ServerError();

        const isSuper = user.lastLikedUserId.split("-");

        if (isSuper[0] === "super") {
            user.lastLikedUserId = user.lastLikedUserId.slice(6);
        } else {
            user.lastLikedUserId = user.lastLikedUserId.slice(1);
        }

        const lastLike = await findSingleLike({
            userId,
            judgedUserId: user.lastLikedUserId,
        });

        const lastRelation = await findUsersRelation({
            OR: [
                {
                    firstUserId: userId,
                    secondUserId: user.lastLikedUserId,
                },
                {
                    firstUserId: user.lastLikedUserId,
                    secondUserId: userId,
                },
            ],
            NOT: {
                relationType: {
                    equals: "removed",
                },
            },
        });

        if (!lastRelation && !lastLike) throw new RewindOnlyLastLikedUser();

        if (lastRelation) {
            if (lastRelation.relationType === "accepted") throw new CannotRewindNewPair();
            await deleteUniqueUsersRelation({ id: lastRelation.id });
        }

        if (lastLike) {
            await deleteLike({ id: lastLike.id });
        }

        if (isSuper[0] === "super") {
            user.superlikesLastDates.pop();
            await updateUniqueUser({ id: userId }, { superlikesLastDates: user.superlikesLastDates.pop() });
        }

        await updateUniqueUser({ id: userId }, { lastLikedUserId: "" });

        // flag
        // return lastLikedUser
        applySuccessToResponse(res);
    } catch (e) {
        console.log(e);
        applyToResponseCustom(res, e);
    }
}
