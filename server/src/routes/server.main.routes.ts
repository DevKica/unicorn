import { Request, Response, Router } from "express";
import usersMainRoutes from "./users/main.routes";
import sessionsMainRoutes from "./sessions/main.routes";
import { applyToResponse, applyToResponseCustom } from "../utils/errors/applyToResponse";
import authMainRoutes from "./auth/main.routes";
import { userMatchProperties, userMatchSelectProperties } from "../@types/prisma/matchedUsers.types";
import { PrismaClient } from "@prisma/client";
import { UserModel } from "../prisma/models";
import { userSelectMatchProperties } from "../prisma/validator";
import calcDistance from "../utils/user/calcDistance";
import { omit } from "lodash";

const serverMainRoutes = Router();

serverMainRoutes.get("/", async (req: Request, res: Response) => {
    try {
        // const users: userMatchProperties[] =
        //     await prisma.$queryRaw`SELECT "public"."User"."id", "public"."User"."name", "public"."User"."surname", "public"."User"."birthday", "public"."User"."description", "public"."User"."city", "public"."User"."sexualOrientation", "public"."User"."gender" FROM "public"."User" WHERE ("public"."User"."active" = ${active} AND "public"."User"."gender" = ${
        //         data.showMeGender
        //     } AND "public"."User"."birthday" > ${gt} AND "public"."User"."birthday" < ${lt} AND "public"."User"."latitude" > ${calcDistance(
        //         data.latitude,
        //         data.longitude,
        //         `"public"."User"."latitude"`,
        //         `"public"."User"."longitude"`
        //     )} AND (NOT "public"."User"."id" = ${data.id}))`;
        const filters = {
            id: "1",
            showMeGender: "Female",
            gender: "Male",
            showMeAgeLowerLimit: 18,
            showMeAgeUpperLimit: 30,
            showMeDistance: 1,
            latitude: 50.05,
            longitude: 100.01,
        };
        const lt = new Date();
        lt.setFullYear(lt.getFullYear() - filters.showMeAgeLowerLimit);
        const gt = new Date();
        gt.setFullYear(gt.getFullYear() - filters.showMeAgeUpperLimit);

        const users = await UserModel.findMany({
            where: {
                active: true,
                gender: filters.showMeGender,
                birthday: {
                    gt,
                    lt,
                },
                NOT: {
                    id: {
                        equals: filters.id,
                    },
                },
            },
            select: userSelectMatchProperties,
        });
        const filteredUsers: userMatchProperties[] = [];

        users.forEach((e: userMatchSelectProperties) => {
            const distance = calcDistance(filters.latitude, filters.longitude, e.latitude, e.longitude);
            if ((distance < filters.showMeDistance && e.showMeGender === filters.gender) || e.showMeGender === "All") {
                filteredUsers.push(omit(e, "latitude", "longitude", "showMeGender"));
            }
        });

        applyToResponse(res, 200, filteredUsers);
    } catch (e: unknown) {
        applyToResponseCustom(res, e);
    }
});

serverMainRoutes.use("/auth", authMainRoutes);

serverMainRoutes.use("/users", usersMainRoutes);

serverMainRoutes.use("/sessions", sessionsMainRoutes);

export default serverMainRoutes;
