export class ServerError extends Error {
    public readonly code: number = 500;
    public readonly message: string = "Server error";
    constructor() {
        super();
        // Without it instanceof doesnt work properly
    }
}

export type CustomError = typeof ServerError;
