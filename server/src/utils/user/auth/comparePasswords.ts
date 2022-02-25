import argon2 from "argon2";
import { UserType } from "../../../@types/prisma/static.types";
import { InvalidCredentials } from "../../errors/main";

export async function comparePasswords(userPassword: UserType["password"], passwordToVerify: UserType["password"]) {
    const valid = await argon2.verify(userPassword, passwordToVerify);
    if (!valid) throw new InvalidCredentials();
}
