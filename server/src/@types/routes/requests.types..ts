import { SexualOrientation, ShowMeGender } from "@prisma/client";
import { Request } from "express";

export interface CreateUserBody {
    name: string;
    surname: string;
    email: string;
    gender: string;
    sexualOrientation: SexualOrientation[];
    showMeGender: ShowMeGender;
    password: string;
    passwordRepetition: string;
    birthday: Date;
    longitude: string;
    latitude: string;
}

export interface CreateUserRequest extends Request {
    body: CreateUserBody;
}
