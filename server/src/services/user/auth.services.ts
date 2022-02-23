import { UserCreateInput } from "../../@types/prisma/static.types";
import { UserModel } from "../../prisma/models";
import { userProfileProperties } from "../../prisma/validator";

export async function createUser(input: UserCreateInput) {
    const user = UserModel.create({
        data: input,
        select: userProfileProperties,
    });
    return user;
}
