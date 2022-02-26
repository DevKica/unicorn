import { Prisma } from "@prisma/client";
import { UserCreateInput, UserFindUniqueInput, UserSelectType, UserType } from "../../@types/prisma/static.types";
import { UserModel } from "../../prisma/models";
import { userProfileProperties } from "../../prisma/validator";
import { NotFound } from "../../utils/errors/main";
import { comparePasswords } from "../../utils/user/auth/comparePasswords";

export async function createUser(input: UserCreateInput) {
    return UserModel.create({
        data: input,
        select: userProfileProperties,
    });
}

export async function findUniqueUser<S extends UserSelectType>(where: UserFindUniqueInput, select: Prisma.Subset<S, UserSelectType>) {
    return UserModel.findUnique<{ select: S } & Omit<Prisma.UserFindUniqueArgs, "select" | "include">>({ where, select });
}

export async function validateUserPassword(passwordToVerify: UserType["password"], filter: UserFindUniqueInput) {
    const user = await findUniqueUser(filter, { ...userProfileProperties, password: true });

    if (!user) throw new NotFound();

    await comparePasswords(user.password, passwordToVerify);

    return user;
}
