import { PrismaClient } from "@prisma/client";
declare global {
    var prisma: PrismaClient | undefined;
}

export const prisma =
    global.prisma ||
    new PrismaClient({
        log: ["info", "warn", "error"],
    });

// hash password before saving in database
prisma.$use(async (params, next) => {
    if (params.model === "User" && (params.action === "create" || params.action === "update")) {
        console.log(params);
    }
    return next(params);
});

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
