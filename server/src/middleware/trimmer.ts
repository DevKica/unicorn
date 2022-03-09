import { Request, Response, NextFunction } from "express";
import { applyToResponseCustom } from "../utils/errors/applyToResponse";
import { TooLargeFile } from "../utils/errors/main";

function trimmer(req: Request, res: Response, next: NextFunction) {
    try {
        if (req.files) {
            Object.values(req.files).forEach((e: any) => {
                if (e.size > 1024 * 1024 * 30) throw new TooLargeFile();
            });
        }

        Object.keys(req.body).map(function (key, _index) {
            if (typeof req.body[key] === "string") req.body[key] = req.body[key].trim();
        });
        next();
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}

export default trimmer;
