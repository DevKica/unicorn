import calcDistance from "../../utils/user/calcDistance";
import { Prisma } from "@prisma/client";
import { UserFilterToMatch, matchedUser } from "../../@types/prisma/matchedUsers.types";
import { UserCreateInput, UserSelectType, UserWhereUniqueInput, UserUpdateInput } from "../../@types/prisma/static.types";
import { UserModel } from "../../prisma/models";
import { userProfileProperties, userSelectMatchProperties } from "../../prisma/validator";
import { findUsersRelation } from "../usersRelation.services";
import pureOmit from "../../utils/responses/omit";
import dayjs from "dayjs";
import { findSingleLike } from "../like.services";

export async function createUser(data: UserCreateInput) {
    const user = await UserModel.create({
        data,
        select: userProfileProperties,
    });
    return user;
}

export async function findUniqueUser<S extends UserSelectType>(where: UserWhereUniqueInput, select: Prisma.Subset<S, UserSelectType>) {
    const user = await UserModel.findUnique<{ select: S } & Omit<Prisma.UserFindUniqueArgs, "select" | "include">>({ where, select });
    return user;
}

export async function updateUniqueUser(where: UserWhereUniqueInput, data: UserUpdateInput, select = { id: true, active: true, subExpiration: true, accountType: true }) {
    const user = await UserModel.update({ where, data, select });
    return user;
}

export async function deleteUniqueUser(where: UserWhereUniqueInput): Promise<void> {
    await UserModel.delete({ where });
}

export async function getUsersToMatch(filters: UserFilterToMatch, limit: number): Promise<matchedUser[]> {
    const lt = dayjs().subtract(filters.showMeAgeLowerLimit, "y").toDate();
    const gt = dayjs().subtract(filters.showMeAgeUpperLimit, "y").toDate();

    const whereObject = {
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
    };

    if (filters.showMeGender === "All") delete whereObject.gender;

    const users = await UserModel.findMany({
        where: whereObject,
        select: {
            ...userSelectMatchProperties,
            user: {
                where: {
                    judgedUserId: filters.id,
                    typeOfLike: "super",
                },
                select: {
                    typeOfLike: true,
                },
            },
        },
        orderBy: {
            birthday: "asc",
        },
    });

    const filteredUsers: matchedUser[] = [];

    for (const e of users) {
        // check if the user has already made such a request
        const alreadyLiked = await findSingleLike({ userId: filters.id, judgedUserId: e.id });

        if (!alreadyLiked) {
            // check if users aren't in relation already
            const usersRelation = await findUsersRelation({
                OR: [
                    { firstUserId: filters.id, secondUserId: e.id },
                    { firstUserId: e.id, secondUserId: filters.id },
                ],
            });

            if (!usersRelation) {
                const distance = calcDistance(filters.latitude, filters.longitude, e.latitude, e.longitude);

                if (distance < filters.showMeDistance && distance < e.showMeDistance && (e.showMeGender === filters.gender || e.showMeGender === "All")) {
                    //@ts-ignore
                    if (e.user.length !== 0) e["superlike"] = true;
                    filteredUsers.push(pureOmit(e, ["latitude", "longitude", "showMeGender", "user", "showMeDistance"]));
                }
            }
        }
    }

    return filteredUsers.slice(0, limit);
}
