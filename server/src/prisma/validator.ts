import { Prisma } from "@prisma/client";
import { UserType } from "../@types/prisma/static.types";

export const PrismaValidator = Prisma.validator;

export const userProfileProperties = Prisma.validator<Prisma.UserSelect>()({
    id: true,
    email: true,
    name: true,
    surname: true,
    birthday: true,
    accountType: true,
    subExpiration: true,
    active: true,
    photos: true,
    description: true,
    sexualOrientation: true,
    gender: true,
    city: true,
    showMeGender: true,
    showMeDistance: true,
    showMeAgeLowerLimit: true,
    showMeAgeUpperLimit: true,
    latitude: true,
    longitude: true,
    createdAt: true,
});

export const userSelectMatchProperties = Prisma.validator<Prisma.UserSelect>()({
    id: true,
    name: true,
    surname: true,
    birthday: true,
    description: true,
    city: true,
    sexualOrientation: true,
    gender: true,
});
