import { BetterJoiError } from "../../validation/helpers/betterJoiError";

export class InvalidRequestedBody extends Error {
    public readonly code: number = 400;
    constructor(public msg?: BetterJoiError[]) {
        super();
        Object.setPrototypeOf(this, InvalidRequestedBody.prototype);
    }
}

export class EmailNotVerified extends Error {
    public readonly code: number = 401;
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
    public readonly msg: string = "Server Error";
    constructor() {
        super();
        Object.setPrototypeOf(this, ServerError.prototype);
    }
}
export class InvalidCredentials extends Error {
    public readonly code: number = 401;
    public readonly msg: string = "Invalid credentials";
    constructor() {
        super();
        Object.setPrototypeOf(this, ServerError.prototype);
    }
}
export class NotFound extends Error {
    public readonly code: number = 404;
    public readonly msg: string = "Not found";
    constructor() {
        super();
        Object.setPrototypeOf(this, ServerError.prototype);
    }
}

export class InvalidFileFormat extends Error {
    public readonly code: number = 400;
    public readonly msg: string = "Invalid file format";
    constructor() {
        super();
        Object.setPrototypeOf(this, InvalidFileFormat.prototype);
    }
}

export class PhotoRequired extends Error {
    public readonly code: number = 400;
    public readonly msg: string = "At least one photo is required";
    constructor() {
        super();
        Object.setPrototypeOf(this, PhotoRequired.prototype);
    }
}
export class BadRequest extends Error {
    public readonly code: number = 400;
    public readonly msg: string = "Bad request";
    constructor() {
        super();
        Object.setPrototypeOf(this, BadRequest.prototype);
    }
}

export class Unauthorized extends Error {
    public readonly code: number = 401;
    public readonly msg: string = "Unauthorized";
    constructor() {
        super();
        Object.setPrototypeOf(this, Unauthorized.prototype);
    }
}

export class ExpiredLink extends Error {
    public readonly code: number = 410;
    public readonly msg: string = "This link has expired";
    constructor() {
        super();
        Object.setPrototypeOf(this, ExpiredLink.prototype);
    }
}

export class InactiveLink extends Error {
    public readonly code: number = 410;
    public readonly msg: string = "This link is no longer active";
    constructor() {
        super();
        Object.setPrototypeOf(this, InactiveLink.prototype);
    }
}
export class InvalidPassword extends Error {
    public readonly code: number = 401;
    public readonly msg: string = "Invalid password";
    constructor() {
        super();
        Object.setPrototypeOf(this, InvalidPassword.prototype);
    }
}

export class UpgradeYourAccount extends Error {
    public readonly code: number = 403;
    public readonly msg: string = "Uprade your account to access this feature";
    constructor() {
        super();
        Object.setPrototypeOf(this, UpgradeYourAccount.prototype);
    }
}
export class FileRequired extends Error {
    public readonly code: number = 400;
    public readonly msg: string = "File is required";
    constructor() {
        super();
        Object.setPrototypeOf(this, FileRequired.prototype);
    }
}

export class VoiceClipTooShort extends Error {
    public readonly code: number = 400;
    public readonly msg: string = "Voice clip is too short";
    constructor() {
        super();
        Object.setPrototypeOf(this, VoiceClipTooShort.prototype);
    }
}

export class VoiceClipTooLong extends Error {
    public readonly code: number = 400;
    public readonly msg: string = "Voice clip is too long";
    constructor() {
        super();
        Object.setPrototypeOf(this, VoiceClipTooLong.prototype);
    }
}

export class TooLargeFile extends Error {
    public readonly code: number = 400;
    public readonly msg: string = "Too Large File";
    constructor() {
        super();
        Object.setPrototypeOf(this, TooLargeFile.prototype);
    }
}

export class TooManyPhotos extends Error {
    public readonly code: number = 400;
    public readonly msg: string = "Too Many Photos";
    constructor() {
        super();
        Object.setPrototypeOf(this, TooManyPhotos.prototype);
    }
}

export class NumberOfLikesExceeded extends Error {
    public readonly code: number = 403;
    public readonly msg: string = "Number of likes exceeded";
    constructor() {
        super();
        Object.setPrototypeOf(this, NumberOfLikesExceeded.prototype);
    }
}
