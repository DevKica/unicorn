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
  console.log("2");
  console.log(params);
  console.log(next);
  return next(params);
  console.log("5");
});

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
