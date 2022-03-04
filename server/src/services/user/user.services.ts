import { Prisma } from "@prisma/client";
import { UserCreateInput, UserSelectType, UserWhereUniqueInput, UserUpdateInput } from "../../@types/prisma/static.types";
import { UserModel } from "../../prisma/models";
import { userProfileProperties } from "../../prisma/validator";

export async function createUser(data: UserCreateInput) {
    return await UserModel.create({
        data,
        select: userProfileProperties,
    });
}

export async function findUniqueUser<S extends UserSelectType>(where: UserWhereUniqueInput, select: Prisma.Subset<S, UserSelectType>) {
    return await UserModel.findUnique<{ select: S } & Omit<Prisma.UserFindUniqueArgs, "select" | "include">>({ where, select });
}

export async function updateUniqueUser(where: UserWhereUniqueInput, data: UserUpdateInput, select = { id: true, active: true }) {
    return await UserModel.update({ where, data, select });
}

export async function deleteUniqueUser(where: UserWhereUniqueInput): Promise<void> {
    await UserModel.delete({ where });
}
