import type { Schema } from "joi";
import { Request, Response, NextFunction } from "express";
import createBetterJoiErrors, { BetterJoiError } from "../helpers/validation/betterJoiError";
import { Forbidden, InvalidRequestedBody } from "../utils/errors/main";
import console from "console";

export type ValidationResult = true | { error: BetterJoiError[] };

export const validate = (schema: Schema, dataToValidate: Object): ValidationResult => {
    const { error } = schema.validate(dataToValidate, { abortEarly: false });

    if (error) return { error: createBetterJoiErrors(error) };
    return true;
};

export const schemaValidation = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = validate(schema, req.body || {});
        if (result !== true) throw new InvalidRequestedBody(result.error);
        next();
    } catch (e: unknown) {
        if (e instanceof InvalidRequestedBody) return res.status(e.code).json({ msg: e.msg });
    }
};
