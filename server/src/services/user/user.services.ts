import { Prisma, User } from "@prisma/client";
import { UserFilterToMatch, userMatchProperties } from "../../@types/prisma/matchedUsers.types";
import { UserCreateInput, UserSelectType, UserWhereUniqueInput, UserUpdateInput, UserWhereInput } from "../../@types/prisma/static.types";
import { UserModel } from "../../prisma/models";
import { userProfileProperties, userSelectMatchProperties } from "../../prisma/validator";

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

export async function getUsersToMatch(data: UserFilterToMatch): Promise<userMatchProperties[]> {
    const whereObject = {
        active: true,
        gender: data.showMeGender,
        NOT: {
            id: {
                equals: data.id,
            },
        },
    };
    if (data.showMeGender === "All") {
        delete whereObject.gender;
    }
    return await UserModel.findMany({
        where: whereObject,
        select: userSelectMatchProperties,
    });
}
