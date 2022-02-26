import { Request, Response } from "express";
import { verifyEmailTokenJWT } from "../config/jwt.config";
import { applyToResponseError } from "../utils/errors/applyToResponse";
import { ExpiredLink, Forbidden } from "../utils/errors/main";

export async function verifyEmailHandler(req: Request, res: Response) {
    try {
        const { newEmail, objectId } = verifyEmailTokenJWT(req.params.token);

        const emailVerification = 
    } catch (e: unknown) {
        applyToResponseError(res, e);
    }
}
