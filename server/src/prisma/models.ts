import { prisma } from "./db";

type UserModelType = typeof prisma.user;
type TestModelType = typeof prisma.test;

export const TestModel: TestModelType = prisma.test;
export const User: UserModelType = prisma.user;
