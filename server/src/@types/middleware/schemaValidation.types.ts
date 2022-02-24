import { BetterJoiError } from "../../validation/helpers/betterJoiError";

export type betterValidationResult = true | { error: BetterJoiError[] };
