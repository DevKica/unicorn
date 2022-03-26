import path from "path";
import { Request, Response } from "express";
import { existsSync } from "fs";
import { usersPhotosPath } from "../../config/upload.config";
import { userProfileProperties } from "../../prisma/validator";
import { findUniqueUser, getUsersToMatch, updateUniqueUser } from "../../services/user/user.services";
import { applyToResponseCustom, applyToResponse } from "../../utils/errors/applyToResponse";
import { NotFound } from "../../utils/errors/main";
import { removeUserPhotos, uploadUserPhotosFromReq } from "../../utils/user/upload/uploadToDir";
import { LikeModel, UsersRelationModel } from "../../prisma/models";
import console from "console";
import dayjs from "dayjs";

export async function getProfilePhotoHandler(req: Request, res: Response): Promise<void> {
    try {
        const { size, photoName } = req.params;

        const photoPath = path.join(usersPhotosPath, `${size}.${photoName}.jpg`);

        if (!existsSync(photoPath)) throw new NotFound();

        return res.sendFile(photoPath);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}

export async function updateUserPhotosHandler(req: Request, res: Response): Promise<void> {
    try {
        const { userId } = res.locals.user;

        const uploadedPhotos = await uploadUserPhotosFromReq(req);

        await removeUserPhotos(userId);

        const updatedUser = await updateUniqueUser({ id: userId }, { photos: uploadedPhotos }, userProfileProperties);

        applyToResponse(res, 200, updatedUser);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}

export async function getUserPrivateInfoHandler(_req: Request, res: Response): Promise<void> {
    try {
        const { userId } = res.locals.user;

        const user = await findUniqueUser({ id: userId }, userProfileProperties);

        if (!user) throw Error;

        applyToResponse(res, 200, user);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}

export async function updateUniqueUserHandler(req: Request, res: Response): Promise<void> {
    try {
        const { userId } = res.locals.user;

        const user = await updateUniqueUser({ id: userId }, req.body, userProfileProperties);

        applyToResponse(res, 200, user);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}

export async function getUsersToMatchHandler(_req: Request, res: Response): Promise<void> {
    try {
        const { userId } = res.locals.user;

        const user = await findUniqueUser({ id: userId }, userProfileProperties);

        if (!user) throw Error;

        const filter = {
            id: user.id,
            gender: user.gender,
            showMeAgeLowerLimit: user.showMeAgeLowerLimit,
            showMeAgeUpperLimit: user.showMeAgeUpperLimit,
            showMeGender: user.showMeGender,
            showMeDistance: user.showMeDistance,
            latitude: user.latitude,
            longitude: user.longitude,
        };
        const users = await getUsersToMatch(filter);

        const gtPreviousDay = {
            createdAt: {
                gt: dayjs().subtract(12, "h").toISOString(),
            },
        };

        const likes = await LikeModel.findMany({
            where: {
                userId: "user1",
                ...gtPreviousDay,
            },
        });

        const relations = await UsersRelationModel.findMany({
            where: {
                OR: [
                    {
                        firstUserId: "user1",
                        relationType: { in: ["accepted", "rejected"] },
                    },
                    {
                        secondUserId: "user1",
                        relationType: { in: ["accepted", "rejected"] },
                    },
                ],
                ...gtPreviousDay,
            },
        });
        console.log(likes.length, relations.length);
        // console.log(users);

        applyToResponse(res, 200, users);
    } catch (e) {
        console.log(e);
        applyToResponseCustom(res, e);
    }
}
