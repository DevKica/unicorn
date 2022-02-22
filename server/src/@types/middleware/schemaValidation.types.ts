import { BetterJoiError } from "../../helpers/validation/betterJoiError";

export type betterValidationResult = true | { error: BetterJoiError[] };
