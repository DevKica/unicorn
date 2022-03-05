import { Request, Response, NextFunction } from "express";

export const emailToLowerCase = (req: Request, _: Response, next: NextFunction) => {
    // console.log(req.body?.email);
    if (req.body?.email) {
        req.body.email = req.body.email.toLowerCase();
    }
    if (req.body.latitude) {
        req.body.latitude = Number(req.body.latitude);
    }
    if (req.body.longitude) {
        req.body.longitude = Number(req.body.longitude);
    }
    return next();
};
