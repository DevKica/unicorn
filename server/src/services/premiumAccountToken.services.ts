import { PremiumAccountTokenWhereUniqueInput } from "../@types/prisma/static.types";
import { PremiumAccountTokenModel } from "../prisma/models";

export async function findUniquePremiumAccountToken(where: PremiumAccountTokenWhereUniqueInput) {
    const premiumAccountTokenObject = await PremiumAccountTokenModel.findUnique({ where });
    return premiumAccountTokenObject;
}
