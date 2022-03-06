import { Request, Response, NextFunction } from "express";
import { verifyUserTokenJWT } from "../config/jwt.config";
import { findSingleSession } from "../services/session/session.services";
import { createAccessCookie, createAuthCookies, removeAuthCookies } from "../utils/user/auth/cookiesHelper";

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken, refreshToken } = req.cookies;

    const { decoded: decodedAccess, expired: expiredAccess } = verifyUserTokenJWT(accessToken);

    if (decodedAccess) {
        const session = await findSingleSession({ id: decodedAccess.sessionId });
        if (!session || !session.valid) return next();
        if (decodedAccess.accountType !== "default") {
            if (new Date(decodedAccess.subExpiration) < new Date()) {
                const userTokenData = { userId: decodedAccess.userId, sessionId: decodedAccess.sessionId, active: decodedAccess.active, accountType: "Default", subExpiration: new Date() };
                createAuthCookies(res, userTokenData);
                res.locals.user = userTokenData;
                return next();
            }
        }
        res.locals.user = decodedAccess;
        return next();
    }

    if (expiredAccess && refreshToken) {
        const { decoded: decodedRefresh } = verifyUserTokenJWT(refreshToken);
        if (!decodedRefresh) {
            removeAuthCookies(res);
            return next();
        }
        if (!decodedRefresh.canRefresh) return next();

        const session = await findSingleSession({ id: decodedRefresh.sessionId });
        if (!session || !session.valid) return next();

        if (decodedRefresh.accountType !== "Default") {
            if (decodedRefresh.subExpiration < new Date()) {
                const userTokenData = { userId: decodedRefresh.userId, sessionId: decodedRefresh.sessionId, active: decodedRefresh.active, accountType: "Default", subExpiration: new Date() };
                createAuthCookies(res, userTokenData);
                res.locals.user = userTokenData;
                return next();
            }
        }
        const { userId, sessionId, active, accountType, subExpiration } = decodedRefresh;

        createAccessCookie(res, { userId, sessionId, active, accountType, subExpiration });

        res.locals.user = decodedRefresh;
    }
    next();
};

export default deserializeUser;
