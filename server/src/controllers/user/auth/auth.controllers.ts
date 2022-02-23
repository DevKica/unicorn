import { Request, Response } from "express";
import { checkEmailAvailability } from "../../../helpers/user/checkEmailAvalibility";
import { applyToResponseError } from "../../../utils/errors/applyToResponseError";

export async function createUserHandler(req: Request, res: Response) {
    try {
        await checkEmailAvailability(req.body.email);
    } catch (e: unknown) {
        return applyToResponseError(res, e);
    }
}
