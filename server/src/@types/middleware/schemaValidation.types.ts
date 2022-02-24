import { BetterJoiError } from "../../utils/validation/betterJoiError";

export type betterValidationResult = true | { error: BetterJoiError[] };
