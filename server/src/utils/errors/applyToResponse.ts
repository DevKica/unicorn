import { Response } from "express";
import { logError } from "../logger";
import { ServerError } from "./main";

export function applyToResponseError(res: Response, e: any): void {
    try {
        res.status(e.code).json({ msg: e.msg });
    } catch (e: unknown) {
        logError(e);
        const serverError = new ServerError();
        res.status(serverError.code).json({ msg: serverError.msg });
    }
}

export function applyToResponse(res: Response, code: number, data: Object): void {
    res.status(code).json(data);
}
