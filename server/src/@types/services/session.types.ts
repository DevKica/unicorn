import { UserType } from "../prisma/static.types";
import { Request, Response } from "express";

export interface SignNewSessionInput {
    id: UserType["id"];
    active: UserType["active"];
    req: Request;
    res: Response;
}
