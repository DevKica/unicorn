import { User } from "@prisma/client";
import { UserCreateInput, UserFindUniqueInput, UserType } from "../../@types/prisma/static.types";
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

export async function findUniqueUser(input: UserFindUniqueInput): Promise<User | null> {
    return UserModel.findUnique({ where: input });
}

export async function validateUserPassword(passwordToVerify: UserType["password"], filter: { email: string } | { id: string }) {
    const user = await findUniqueUser(filter);
    if (!user) throw new NotFound();
    await comparePasswords(user.password, passwordToVerify);
    return user;
}
