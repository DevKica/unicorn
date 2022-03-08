import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import { ORIGIN } from "./config/env.config";
import deserializeUser from "./middleware/deserializeUser";
import { emailToLowerCase } from "./middleware/emailToLowerCase";
import trimmer from "./middleware/trimmer";
import serverMainRoutes from "./routes/server.main.routes";

const server = express();

server.use(
    cors({
        origin: ORIGIN,
        credentials: true,
    })
);

server.use(express.json());

server.use(cookieParser());

server.use(
    fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
    })
);

server.use(trimmer);

server.use(emailToLowerCase);

server.use(deserializeUser);

server.use("/api/v1", serverMainRoutes);

export default server;
