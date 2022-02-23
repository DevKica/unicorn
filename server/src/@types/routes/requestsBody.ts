import { SexualOrientation } from "@prisma/client";
import { Request } from "express";

export interface CreateUserBody {
    name: string;
    surname: string;
    email: string;
    gender: string;
    sexualOrientation: SexualOrientation[];
    password: string;
    passwordRepetition: string;
    birthday: Date;
}

export type CreateUserRequest = Request<{}, {}, {}, CreateUserBody>;
