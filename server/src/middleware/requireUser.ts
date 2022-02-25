import { Request, Response } from "express";
import { applyToResponseError } from "../utils/errors/applyToResponse";
import { EmailNotVerified, Forbidden } from "../utils/errors/main";

export function requireActiveUser(_req: Request, res: Response, next: Function): void {
    try {
        const user = res.locals.user;

        if (!user) throw new Forbidden();

        if (!user.active) throw new EmailNotVerified();

        next();
    } catch (e: unknown) {
        applyToResponseError(res, e);
    }
}

export function requireUser(_req: Request, res: Response, next: Function): void {
    try {
        const user = res.locals.user;

        if (!user) throw new Forbidden();

        next();
    } catch (e: unknown) {
        applyToResponseError(res, e);
    }
}
