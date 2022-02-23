import express, { Request, Response } from "express";
// import { getClientIp } from "@supercharge/request-ip/dist";
import appMainRoutes from "./routes/app.main.routes";
import { createUserSchema } from "./validation/user.schema";
import { emailToLowerCase } from "./middleware/emailToLowerCase";
import { schemaValidation, validate } from "./middleware/schemaValidation";
import { checkEmailAvailability } from "./helpers/user/checkEmailAvalibility";
import cookieParser from "cookie-parser";

const server = express();
server.get("/", async (_req: Request, res: Response) => {
    // console.log(getClientIp(req));
    // const result = req.get("user-agent");
    // console.log(lookup(getClientIp(req) || ""));
    // console.log(lookup("91.124.176.49"));
    // console.log("tu");
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
