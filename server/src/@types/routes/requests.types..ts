import { SexualOrientation, ShowMeGender } from "@prisma/client";
import { Request, Response } from "express";
import { UserType, SessionType } from "../prisma/static.types";

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

export interface LoginUserBody {
    email: string;
    password: string;
}

export interface LoginUserRequest extends Request {
    body: LoginUserBody;
}
export interface MainResponse extends Response {
    locals: {
        user: {
            userId: UserType["id"];
            active: UserType["active"];
            sessionId: SessionType["id"];
        };
    };
}
