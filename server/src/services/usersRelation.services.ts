import { UsersRelationCreateInput } from "../@types/prisma/static.types";
import { UsersRelationModel } from "../prisma/models";

export async function createUsersRelations(data: UsersRelationCreateInput) {
    await UsersRelationModel.create({ data });
}

export async function findUsersRelation(where: any) {
    await UsersRelationModel.findFirst({ where });
}

export async function deleteUsersRelation(where: any) {
    await UsersRelationModel.delete({ where });
}
