import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["info", "warn", "error"],
  });

prisma.$use(async (params, next) => {
  return next(params);
});

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
