import { Prisma } from "@prisma/client";
import { filter } from "lodash";
import { UserCreateInput, UserWhereUniqueInput, UserSelectType, UserType, UserUpdateInput } from "../../@types/prisma/static.types";
import { UserModel } from "../../prisma/models";
import { userProfileProperties } from "../../prisma/validator";
import { InvalidCredentials, NotFound } from "../../utils/errors/main";
import { comparePasswords } from "../../utils/user/auth/comparePasswords";

export async function createUser(data: UserCreateInput) {
    return UserModel.create({
        data,
        select: userProfileProperties,
    });
}

export async function checkIfUserExists(where: UserWhereUniqueInput) {
    if (!(await findUniqueUser(where, { id: true }))) throw new NotFound();
}

export async function findUniqueUser<S extends UserSelectType>(where: UserWhereUniqueInput, select: Prisma.Subset<S, UserSelectType>) {
    return UserModel.findUnique<{ select: S } & Omit<Prisma.UserFindUniqueArgs, "select" | "include">>({ where, select });
}

export async function validateUserPassword(passwordToVerify: UserType["password"], filter: UserWhereUniqueInput) {
    const user = await findUniqueUser(filter, { ...userProfileProperties, password: true });

    if (!user) throw new InvalidCredentials();

    await comparePasswords(user.password, passwordToVerify);

    return user;
}

export async function updateUniqueUser(where: UserWhereUniqueInput, data: UserUpdateInput, select = { id: true, active: true }) {
    return UserModel.update({ where, data, select });
}
