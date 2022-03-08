import { Request, Response } from "express";
import { existsSync } from "fs";
import path from "path";
import { usersPhotosDirname } from "../../config/upload.config";
import { userProfileProperties } from "../../prisma/validator";
import { findUniqueUser, getUsersToMatch, updateUniqueUser } from "../../services/user/user.services";
import { applyToResponseCustom, applyToResponse, applySuccessToResponse } from "../../utils/errors/applyToResponse";
import { NotFound } from "../../utils/errors/main";

export async function getProfilePhotoHandler(req: Request, res: Response): Promise<void> {
    try {
        const { size, photoName } = req.params;

        const photoPath = path.join(usersPhotosDirname, `${size}.${photoName}.jpg`);

        if (!existsSync(photoPath)) throw new NotFound();

        return res.sendFile(photoPath);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}

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

        applyToResponse(res, 200, users);
    } catch (e) {
        console.log(e);
        applyToResponseCustom(res, e);
    }
}
