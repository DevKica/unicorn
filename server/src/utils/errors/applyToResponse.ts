import { Response } from "express";
import { omit } from "lodash";
import { SuccessResponse } from "../responses/main";
import { ServerError } from "./main";

export function applyToResponseCustom(res: Response, e: any): void {
    try {
        res.status(e.code).json({ msg: e.msg });
    } catch (e: unknown) {
        const serverError = new ServerError();
        res.status(serverError.code).json({ msg: serverError.msg });
    }
}

export function applySuccessToResponse(res: Response): void {
    res.status(200).json(omit(SuccessResponse, "code"));
}

export function applyToResponse(res: Response, code: number, data: Object): void {
    res.status(code).json(data);
}
