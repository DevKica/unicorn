import { BetterJoiError } from "../../validation/helpers/betterJoiError";

export class InvalidRequestedBody extends Error {
    public readonly code: number = 400;
    constructor(public msg?: BetterJoiError[]) {
        super();
        // Without it instanceof doesnt work properly
        Object.setPrototypeOf(this, InvalidRequestedBody.prototype);
    }
}

export class EmailNotVerified extends Error {
    public readonly code: number = 403;
    public readonly msg: string = "Email not verified";
    constructor() {
        super();

        Object.setPrototypeOf(this, Forbidden.prototype);
    }
}
export class Forbidden extends Error {
    public readonly code: number = 403;
    public readonly msg: string = "Forbidden";
    constructor() {
        super();

        Object.setPrototypeOf(this, Forbidden.prototype);
    }
}
export class EmailAlreadyExists extends Error {
    public readonly code: number = 409;
    public readonly msg: string = "Email already exists";
    constructor() {
        super();

        Object.setPrototypeOf(this, EmailAlreadyExists.prototype);
    }
}

export class ServerError extends Error {
    public readonly code: number = 500;
    public readonly msg: string = "ServerErrror";
    constructor() {
        super();

        Object.setPrototypeOf(this, ServerError.prototype);
    }
}
