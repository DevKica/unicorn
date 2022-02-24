import cors from "cors";
import { ORIGIN } from "./config/env.config";
import express, { Request, Response } from "express";
import { emailToLowerCase } from "./middleware/emailToLowerCase";
import cookieParser from "cookie-parser";
import appMainRoutes from "./routes/app.main.routes";
import deserializeUser from "./middleware/deserializeUser";

const server = express();

server.use(
    cors({
        origin: ORIGIN,
        credentials: true,
    })
);

server.use(express.json());

server.use(cookieParser());

server.use(deserializeUser);

server.use(emailToLowerCase);

server.get("/", async (req: Request, res: Response) => {
    // res.json("2115");
    res.status(400).end();
});
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
