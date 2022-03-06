import { Prisma } from "@prisma/client";
import { omit } from "lodash";
import { UserWhereUniqueInput, UserType, UserSelectType } from "../../@types/prisma/static.types";
import { userProfileProperties } from "../../prisma/validator";
import { InvalidCredentials, NotFound } from "../../utils/errors/main";
import { comparePasswords } from "../../utils/user/auth/comparePasswords";
import { findUniqueUser } from "./user.services";

export async function checkIfActiveUserExists<S extends UserSelectType>(where: UserWhereUniqueInput, select: Prisma.Subset<S, UserSelectType>) {
    const user = await findUniqueUser(where, { ...select, active: true });
    //@ts-ignore
    if (!user || !user.active) throw new NotFound();
    return user;
}

export async function validateUserPassword(passwordToVerify: UserType["password"], filter: UserWhereUniqueInput) {
    const user = await findUniqueUser(filter, { ...userProfileProperties, password: true });

    if (!user) throw new InvalidCredentials();

    await comparePasswords(user.password, passwordToVerify);

    return omit(user, "password");
}
