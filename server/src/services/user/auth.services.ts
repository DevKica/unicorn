import { User } from "@prisma/client";
import { UserCreateInput, UserFindUniqueInput } from "../../@types/prisma/static.types";
import { UserModel } from "../../prisma/models";
import { userProfileProperties } from "../../prisma/validator";

export async function createUser(input: UserCreateInput) {
    return UserModel.create({
        data: input,
        select: userProfileProperties,
    });
}

export async function findUniqueUser(input: UserFindUniqueInput): Promise<User | null> {
    return UserModel.findUnique({ where: input });
}
