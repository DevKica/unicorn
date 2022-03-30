import { LikeCreateInput, LikeWhereInput, LikeWhereUniqueInput } from "../@types/prisma/static.types";
import { LikeModel } from "../prisma/models";

export async function createLike(data: LikeCreateInput): Promise<void> {
    await LikeModel.create({ data });
}

export async function findSingleLike(where: LikeWhereInput) {
    const like = await LikeModel.findFirst({
        where,
        orderBy: {
            createdAt: "desc",
        },
    });
    return like;
}

export async function findManyLikes(where: LikeWhereInput) {
    const like = await LikeModel.findMany({ where });
    return like;
}

export async function deleteLike(where: LikeWhereUniqueInput): Promise<void> {
    await LikeModel.delete({ where });
}
