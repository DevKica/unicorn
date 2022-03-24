import argon2 from "argon2";
import { PrismaClient } from "@prisma/client";
declare global {
    var prisma: PrismaClient | undefined;
}

let databaseUrl = process.env.DATABASE_URL;
if (process.env.NODE_ENV === "test") {
    databaseUrl = process.env.TEST_DATABASE_URL;
}

export const prisma =
    global.prisma ||
    new PrismaClient({
        log: process.env.NODE_ENV !== "test" ? ["info", "warn", "error"] : ["warn", "error"],
        errorFormat: "pretty",
        datasources: { db: { url: databaseUrl } },
    });

// hash password or token
prisma.$use(async (params, next) => {
    if (params.model === "PremiumAccountToken" && params.action === "create") {
        params.args.data.token = await argon2.hash(params.args.data.token);
    }
    if (params.model === "User" && (params.action === "create" || params.action === "update")) {
        if (params.args.data.password) {
            params.args.data.password = await argon2.hash(params.args.data.password);
        }
    }
    return next(params);
});

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
