import { AccountType } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { applyToResponseCustom } from "../utils/errors/applyToResponse";
import { UpgradeYourAccount } from "../utils/errors/main";

export function requirePremiumAccount(expectedType: AccountType[], res: Response) {
    if (!expectedType.includes(res.locals.user.accountType)) throw new UpgradeYourAccount();
}
export function requireBlackAccountType(_req: Request, res: Response, next: NextFunction) {
    try {
        requirePremiumAccount(["black"], res);
        next();
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}
export function requireSilverAccountType(_req: Request, res: Response, next: NextFunction) {
    try {
        requirePremiumAccount(["silver", "gold", "black"], res);
        next();
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}
export function requireGoldAccountType(_req: Request, res: Response, next: NextFunction) {
    try {
        requirePremiumAccount(["gold", "black"], res);
        next();
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}
