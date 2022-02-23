import { Prisma } from "@prisma/client";

export const PrismaValidator = Prisma.validator;

export const userProfileProperties = Prisma.validator<Prisma.UserSelect>()({
    id: true,
    email: true,
    name: true,
    surname: true,
    birthday: true,
});
