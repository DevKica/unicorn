import { prisma } from "./db";

type UserModelType = typeof prisma.user;

export const User: UserModelType = prisma.user;
