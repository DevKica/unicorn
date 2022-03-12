import http from "http";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import trimmer from "./middleware/trimmer";
import fileUpload from "express-fileupload";
import { ORIGIN } from "./config/env.config";
import deserializeUser from "./middleware/deserializeUser";
import serverMainRoutes from "./routes/server.main.routes";
import { emailToLowerCase } from "./middleware/emailToLowerCase";

const app = express();

app.use(
    cors({
        origin: ORIGIN,
        credentials: true,
    })
);

app.use(express.json());

app.use(cookieParser());

app.use(fileUpload());

app.use(trimmer);

app.use(emailToLowerCase);

app.use(deserializeUser);

app.use("/api/v1", serverMainRoutes);

const server = http.createServer(app);

export default server;
