import { Request, Response, Router } from "express";
import usersMainRoutes from "./users/main.routes";
import sessionsMainRoutes from "./sessions/main.routes";
import { applyToResponse, applyToResponseCustom } from "../utils/errors/applyToResponse";
import authMainRoutes from "./auth/main.routes";
import likesMainRoutes from "./likes/main.routes";
import messagesMainRoutes from "./messages/main.routes";

const serverMainRoutes = Router();

// its one big playground route, just for testing
serverMainRoutes.get("/", async (req: Request, res: Response) => {
    let result = {};
    try {
        console.log(req.cookies);
        console.log(req.body);

        applyToResponse(res, 200, result);
    } catch (e: unknown) {
        console.log(e);
        applyToResponseCustom(res, e);
    }
});

serverMainRoutes.use("/auth", authMainRoutes);

serverMainRoutes.use("/users", usersMainRoutes);

serverMainRoutes.use("/sessions", sessionsMainRoutes);

serverMainRoutes.use("/likes", likesMainRoutes);

serverMainRoutes.use("/messages", messagesMainRoutes);

export default serverMainRoutes;
