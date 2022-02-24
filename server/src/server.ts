import cors from "cors";
import { ORIGIN } from "./config/env.config";
import express, { Request, Response } from "express";
import { emailToLowerCase } from "./middleware/emailToLowerCase";
import cookieParser from "cookie-parser";
import appMainRoutes from "./routes/app.main.routes";
import deserializeUser from "./middleware/deserializeUser";
import { applyToResponseError } from "./utils/errors/applyToResponse";
import { EmailAlreadyExists } from "./utils/errors/main";

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
    try {
        throw new EmailAlreadyExists();
    } catch (e: unknown) {
        applyToResponseError(res, e);
    }
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
