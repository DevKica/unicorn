import { Request, Response } from "express";
import { applyToResponseError } from "../utils/errors/applyToResponse";
import { EmailNotVerified, Unauthorized } from "../utils/errors/main";

export function requireActiveUser(_req: Request, res: Response, next: Function): void {
    try {
        const user = res.locals.user;

        if (!user) throw new Unauthorized();

        if (!user.active) throw new EmailNotVerified();

        next();
    } catch (e: unknown) {
        applyToResponseError(res, e);
    }
}

export function requireUser(_req: Request, res: Response, next: Function): void {
    try {
        const user = res.locals.user;

        if (!user) throw new Unauthorized();

        next();
    } catch (e: unknown) {
        applyToResponseError(res, e);
    }
}
