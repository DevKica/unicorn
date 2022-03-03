import { PremiumUser } from "@prisma/client";
import { PremiumUserCreateInput, PremiumUserWhereUniqueInput } from "../../@types/prisma/static.types";
import { PremiumUserModel } from "../../prisma/models";

export async function createPremiumUser(data: PremiumUserCreateInput): Promise<PremiumUser> {
    return await PremiumUserModel.create({ data });
}

export async function findUniquePremiumUser(where: PremiumUserWhereUniqueInput): Promise<PremiumUser | null> {
    return await PremiumUserModel.findUnique({ where });
}

export async function deletePremimUser(where: PremiumUserWhereUniqueInput): Promise<void> {
    await PremiumUserModel.delete({ where });
}
