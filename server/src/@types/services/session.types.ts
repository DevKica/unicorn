import { UserType } from "../prisma/static.types";
import { Request } from "express";

export interface SignNewSessionInput {
    id: UserType["id"];
    req: Request;
}
