import { Request, Response } from "express";
import { applyToResponseCustom } from "../utils/errors/applyToResponse";
import { EmailNotVerified, Unauthorized } from "../utils/errors/main";

export function requireUserFn(res: Response) {
    if (!res.locals.user) throw new Unauthorized();
}

export function requireActiveUserFn(res: Response) {
    if (!res.locals.user.active) throw new EmailNotVerified();
}

export function requireActiveUser(_req: Request, res: Response, next: Function): void {
    try {
        requireUserFn(res);
        requireActiveUserFn(res);

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
