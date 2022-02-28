import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import { ORIGIN } from "./config/env.config";
import deserializeUser from "./middleware/deserializeUser";
import { emailToLowerCase } from "./middleware/emailToLowerCase";
import appMainRoutes from "./routes/app.main.routes";
import { applyToResponse, applyToResponseCustom } from "./utils/errors/applyToResponse";
import { SuccessResponse } from "./utils/responses/main";

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

server.get("/test", async (req, res) => {
    try {
        applyToResponse(res, 200, SuccessResponse);
    } catch (e) {
        applyToResponseCustom(res, e);
    }
});

export default server;
