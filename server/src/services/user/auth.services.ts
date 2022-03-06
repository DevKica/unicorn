import { omit } from "lodash";
import { UserWhereUniqueInput, UserType } from "../../@types/prisma/static.types";
import { userProfileProperties } from "../../prisma/validator";
import { InvalidCredentials, NotFound } from "../../utils/errors/main";
import { comparePasswords } from "../../utils/user/auth/comparePasswords";
import { findUniqueUser } from "./user.services";

interface CheckIfActiveUserInput extends UserWhereUniqueInput {
    active: boolean;
}

export async function checkIfUserExists(where: CheckIfActiveUserInput) {
    if (!(await findUniqueUser(where, { id: true }))) throw new NotFound();
}

export async function validateUserPassword(passwordToVerify: UserType["password"], filter: UserWhereUniqueInput) {
    const user = await findUniqueUser(filter, { ...userProfileProperties, password: true });

    if (!user) throw new InvalidCredentials();

    await comparePasswords(user.password, passwordToVerify);

    return omit(user, "password");
}
