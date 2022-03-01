import { Prisma } from "@prisma/client";
import { UserCreateInput, UserSelectType, UserWhereUniqueInput, UserUpdateInput } from "../../@types/prisma/static.types";
import { UserModel } from "../../prisma/models";
import { userProfileProperties } from "../../prisma/validator";

export async function createUser(data: UserCreateInput) {
    return UserModel.create({
        data,
        select: userProfileProperties,
    });
}

export async function findUniqueUser<S extends UserSelectType>(where: UserWhereUniqueInput, select: Prisma.Subset<S, UserSelectType>) {
    return UserModel.findUnique<{ select: S } & Omit<Prisma.UserFindUniqueArgs, "select" | "include">>({ where, select });
}

export async function updateUniqueUser(where: UserWhereUniqueInput, data: UserUpdateInput, select = { id: true, active: true }) {
    return UserModel.update({ where, data, select });
}
