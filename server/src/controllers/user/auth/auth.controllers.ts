import { Request, Response } from "express";
import { checkEmailAvailability } from "../../../helpers/user/checkEmailAvalibility";
import { createUser } from "../../../services/user/auth.services";
import { applyToResponseError } from "../../../utils/errors/applyToResponseError";
import { prepareCreateUserInput } from "./prepareUserCreateInput";

export async function createUserHandler(req: Request, res: Response) {
    try {
        await checkEmailAvailability(req.body.email);

        const input = prepareCreateUserInput(req.body);

        const user = await createUser(req.body);
        console.log(user.email);
    } catch (e: unknown) {
        return applyToResponseError(res, e);
    }
}
