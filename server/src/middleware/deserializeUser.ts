import console from "console";
import { Request, Response, NextFunction } from "express";
import { MAIN_SECRET_TOKEN } from "../config/env.config";
import { verifyJWT } from "../config/jwt.config";
import { findSingleSession } from "../services/session/session.services";
import { createAccessCookie, removeAuthCookies } from "../utils/user/auth/cookiesHelper";

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken, refreshToken } = req.cookies;

    console.log(req.files);

    if (req.files) {
        console.log(req.files["avatar"]);
    }

    const { decoded: decodedAccess, expired: expiredAccess } = verifyJWT(accessToken, MAIN_SECRET_TOKEN);

    if (decodedAccess) {
        const session = await findSingleSession({ id: decodedAccess.sessionId });
        if (!session || !session.valid) return next();
        res.locals.user = decodedAccess;
        return next();
    }

    if (expiredAccess && refreshToken) {
        const { decoded: decodedRefresh } = verifyJWT(refreshToken, MAIN_SECRET_TOKEN);
        if (!decodedRefresh) {
            removeAuthCookies(res);
            return next();
        }
        if (!decodedRefresh.canRefresh) return next();

        const session = await findSingleSession({ id: decodedRefresh.sessionId });
        if (!session || !session.valid) return next();

        createAccessCookie(res, { userId: decodedRefresh.userId, sessionId: decodedRefresh.sessionI, active: decodedRefresh.active });

        res.locals.user = decodedRefresh;

        next();
    }
    next();
};

export default deserializeUser;
