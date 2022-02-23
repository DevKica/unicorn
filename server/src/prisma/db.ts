import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
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
        if (params.args.data.password) {
            params.args.data.password = await argon2.hash(params.args.data.password);
        }
    }
    return next(params);
});

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
