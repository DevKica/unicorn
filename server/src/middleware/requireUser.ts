import { Request, Response } from "express";
import { applyToResponseCustom } from "../utils/errors/applyToResponse";
import { EmailNotVerified, Unauthorized } from "../utils/errors/main";

function requireUserFn(res: Response) {
    const user = res.locals.user;

    if (!user) throw new Unauthorized();
}

export function requireActiveUser(_req: Request, res: Response, next: Function): void {
    try {
        const user = res.locals.user;

        requireUserFn(res);

        if (!user.active) throw new EmailNotVerified();

        next();
    } catch (e: unknown) {
        applyToResponseCustom(res, e);
    }
}

export function requireUser(_req: Request, res: Response, next: Function): void {
    try {
        requireUserFn(res);
        next();
    } catch (e: unknown) {
        applyToResponseCustom(res, e);
    }
}
