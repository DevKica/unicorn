import type { Schema } from "joi";
import { Request, Response, NextFunction } from "express";
import { betterValidationResult } from "../@types/middleware/schemaValidation.types";
import { applyToResponseCustom } from "../utils/errors/applyToResponse";
import { InvalidRequestedBody } from "../utils/errors/main";
import createBetterJoiErrors from "../validation/helpers/betterJoiError";

export const validate = (schema: Schema, dataToValidate: Object): betterValidationResult => {
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
        return applyToResponseCustom(res, e);
    }
};
