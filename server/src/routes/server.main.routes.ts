import { Request, Response, Router } from "express";
import usersMainRoutes from "./users/main.routes";
import sessionsMainRoutes from "./sessions/main.routes";
import { applyToResponse, applyToResponseCustom } from "../utils/errors/applyToResponse";
import { requireActiveUser } from "../middleware/requireUser";
import authMainRoutes from "./auth/main.routes";

const serverMainRoutes = Router();

serverMainRoutes.get("/", async (req: Request, res: Response) => {
    try {
        console.log("LOCALS");
        console.log(res.locals.user);
        console.log("END OF LOCALS");
        applyToResponse(res, 200, { msg: "2115" });
    } catch (e: unknown) {
        applyToResponseCustom(res, e);
    }
});

serverMainRoutes.use("/auth", authMainRoutes);

serverMainRoutes.use("/users", usersMainRoutes);

serverMainRoutes.use("/sessions", sessionsMainRoutes);

export default serverMainRoutes;
