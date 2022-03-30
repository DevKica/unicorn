import { UsersRelationModel } from "../prisma/models";
import { UsersRelationCreateInput, UsersRelationUpdateInput, UsersRelationWhereInput, UsersRelationWhereUniqueInput } from "../@types/prisma/static.types";

export async function createUsersRelations(data: UsersRelationCreateInput) {
    await UsersRelationModel.create({ data });
}

export async function findUsersRelation(where: UsersRelationWhereInput) {
    const usersRelation = await UsersRelationModel.findFirst({
        where,
        orderBy: {
            createdAt: "desc",
        },
    });
    return usersRelation;
}

export async function findManyUsersRelations(where: UsersRelationWhereInput) {
    const usersRelations = await UsersRelationModel.findMany({ where });
    return usersRelations;
}

export async function updateUsersRelation(where: UsersRelationWhereInput, data: UsersRelationUpdateInput) {
    await UsersRelationModel.updateMany({ where, data });
}

export async function deleteUniqueUsersRelation(where: UsersRelationWhereUniqueInput) {
    await UsersRelationModel.delete({ where });
}

export async function deleteManyUsersRelation(where: UsersRelationWhereInput) {
    await UsersRelationModel.deleteMany({ where });
}
