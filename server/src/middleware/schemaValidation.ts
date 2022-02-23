import type { Schema } from "joi";
import { Request, Response, NextFunction } from "express";
import createBetterJoiErrors from "../helpers/validation/betterJoiError";
import { InvalidRequestedBody } from "../utils/errors/main";
import { betterValidationResult } from "../@types/middleware/schemaValidation.types";
import { applyToResponseError } from "../utils/errors/applyToResponse";

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
        return applyToResponseError(res, e);
    }
};
