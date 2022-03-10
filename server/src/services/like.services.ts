import { LikeCreateInput, LikeWhereInput, LikeWhereUniqueInput } from "../@types/prisma/static.types";
import { LikeModel } from "../prisma/models";

export async function createLike(data: LikeCreateInput): Promise<void> {
    await LikeModel.create({ data });
}

export async function findLike(where: LikeWhereInput) {
    const like = await LikeModel.findFirst({ where });
    return like;
}

export async function deleteLike(where: LikeWhereUniqueInput): Promise<void> {
    await LikeModel.delete({ where });
}
