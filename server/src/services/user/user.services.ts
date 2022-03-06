import { Prisma } from "@prisma/client";
import { omit } from "lodash";
import { UserFilterToMatch, userMatchProperties, userMatchSelectProperties } from "../../@types/prisma/matchedUsers.types";
import { UserCreateInput, UserSelectType, UserWhereUniqueInput, UserUpdateInput, UserWhereInput } from "../../@types/prisma/static.types";
import { UserModel } from "../../prisma/models";
import { userProfileProperties, userSelectMatchProperties } from "../../prisma/validator";
import calcDistance from "../../utils/user/calcDistance";

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

export async function getUsersToMatch(filters: UserFilterToMatch): Promise<userMatchProperties[]> {
    const lt = new Date();
    lt.setFullYear(lt.getFullYear() - filters.showMeAgeLowerLimit);
    const gt = new Date();
    gt.setFullYear(gt.getFullYear() - filters.showMeAgeUpperLimit);

    const users = await UserModel.findMany({
        where: {
            active: true,
            gender: filters.showMeGender,
            birthday: {
                gt,
                lt,
            },
            NOT: {
                id: {
                    equals: filters.id,
                },
            },
        },
        select: userSelectMatchProperties,
        orderBy: {
            birthday: "desc",
        },
    });
    const filteredUsers: userMatchProperties[] = [];

    users.forEach((e: userMatchSelectProperties) => {
        const distance = calcDistance(filters.latitude, filters.longitude, e.latitude, e.longitude);
        if (distance < filters.showMeDistance && (e.showMeGender === filters.gender || e.showMeGender === "All")) {
            filteredUsers.push(omit(e, "latitude", "longitude", "showMeGender"));
        }
    });
    return filteredUsers;
}
