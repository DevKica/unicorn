import { BetterJoiError } from "../../helpers/validation/betterJoiError";

export class InvalidRequestedBody extends Error {
    constructor(public schemaFeedback?: BetterJoiError[]) {
        super();

        Object.setPrototypeOf(this, InvalidRequestedBody.prototype);
    }
}

export class Forbidden extends Error {}
export class EmailAlreadyExists extends Error {}
