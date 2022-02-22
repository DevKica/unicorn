import { Request, Response } from "express";
import { checkEmailAvailability } from "../../../helpers/user/checkEmailAvalibility";
import { applyToResponseError } from "../../../utils/errors/applyToResponseError";
import { EmailAlreadyExists, Forbidden, ServerError } from "../../../utils/errors/main";

export async function createUserHandler(req: Request, res: Response) {
    try {
        await checkEmailAvailability(req.body.email);
    } catch (e: unknown) {
        if (e instanceof EmailAlreadyExists) {
            return applyToResponseError(res, e);
        } else if (e instanceof Forbidden) {
            return applyToResponseError(res, e);
        } else {
            return applyToResponseError(res, new ServerError());
        }
    }
}
