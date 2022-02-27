import cors from "cors";
import { ORIGIN } from "./config/env.config";
import express from "express";
import { emailToLowerCase } from "./middleware/emailToLowerCase";
import cookieParser from "cookie-parser";
import appMainRoutes from "./routes/app.main.routes";
import deserializeUser from "./middleware/deserializeUser";
import fileUpload from "express-fileupload";
import { deletePasswordReset } from "./services/user/passwordReset.services";
import { applyToResponse, applyToResponseCustom } from "./utils/errors/applyToResponse";
import { SuccessResponse } from "./utils/responses/main";
import { deleteAllSessions } from "./services/session/session.services";

const server = express();

server.use(
    cors({
        origin: ORIGIN,
        credentials: true,
    })
);

server.use(express.json());

server.use(cookieParser());

server.use(fileUpload());

server.use(emailToLowerCase);

server.use(deserializeUser);

server.use("/api/v1", appMainRoutes);

server.get("/hello", async (req, res) => {
    try {
        // await deleteAllSessions({ userId: "12" });
        applyToResponse(res, 200, SuccessResponse);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
});
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
