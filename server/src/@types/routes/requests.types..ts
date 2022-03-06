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
    longitude: number;
    latitude: number;
}

export interface CreateUserRequest extends Request {
    body: CreateUserBody;
}

export interface LoginUserBody {
    email: UserType["email"];
    password: UserType["password"];
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

export interface ChangePasswordBody {
    oldPassword: UserType["password"];
    password: UserType["password"];
    passwordRepetition: UserType["password"];
}

export interface ChangePasswordRequest extends Request {
    body: ChangePasswordBody;
}
