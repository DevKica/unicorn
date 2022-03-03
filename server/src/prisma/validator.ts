import { Prisma } from "@prisma/client";

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
    showMeAgeLowerLimit: true,
    showMeAgeUpperLimit: true,
    latitude: true,
    longitude: true,
    createdAt: true,
});
