import { AccountType } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { applyToResponseCustom } from "../utils/errors/applyToResponse";
import { UpgradeYourAccount } from "../utils/errors/main";

export function requirePremiumAccount(expectedType: AccountType, res: Response) {
    if (res.locals.user.accountType !== expectedType) throw new UpgradeYourAccount();
}
export function requireBlackAccountType(_req: Request, res: Response, next: NextFunction) {
    try {
        requirePremiumAccount("black", res);
        next();
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}
export function requireSilverAccountType(_req: Request, res: Response, next: NextFunction) {
    try {
        requirePremiumAccount("silver", res);
        next();
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}
export function requireGoldAccountType(_req: Request, res: Response, next: NextFunction) {
    try {
        requirePremiumAccount("gold", res);
        next();
    } catch (e) {
        applyToResponseCustom(res, e);
    }
}
