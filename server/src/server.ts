import express, { Request, Response } from "express";
import { createUserSchema } from "./validation/user.schema";
import { emailToLowerCase } from "./middleware/emailToLowerCase";
import { schemaValidation, validate } from "./middleware/schemaValidation";
import cookieParser from "cookie-parser";
import { getClientIp } from "@supercharge/request-ip/dist";
import { lookup } from "geoip-lite";
import appMainRoutes from "./routes/app.main.routes";

const server = express();
server.get("/", async (req: Request, res: Response) => {
    console.log(getClientIp(req));
    const result = req.get("user-agent");
    console.log(lookup(getClientIp(req) || ""));
    console.log(lookup("91.123.176.49"));
    console.log("tu");
    res.json("2115");
});

server.use(express.json());

server.use(cookieParser());

server.use(emailToLowerCase);

server.use("/api/v1", appMainRoutes);

// server.get("/create", async (_: Request, res: Response) => {
//     const date = new Date("2020-01-05");
//     const data = await TestTime.create({ data: { birthday: date } });
//     const heh = await TestTime.findMany({
//       where: {
//         birthday: {
//           gte: new Date("2020-01-01"),
//           lt: new Date("2020-01-06"),
//         },
//       },
//     });
//     res.json(data);
// });

export default server;
