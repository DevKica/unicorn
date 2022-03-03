import usersMainRoutes from "./users/main.routes";
import { Request, Response, Router } from "express";
import { applyToResponse, applyToResponseCustom } from "../utils/errors/applyToResponse";
import sessionsMainRoutes from "./sessions/main.routes";

const appMainRoutes = Router();

appMainRoutes.post("/", async (req: Request, res: Response) => {
    try {
        applyToResponse(res, 200, { msg: "2115" });
    } catch (e: unknown) {
        applyToResponseCustom(res, e);
    }
});

appMainRoutes.use("/users", usersMainRoutes);

appMainRoutes.use("/sessions", sessionsMainRoutes);

export default appMainRoutes;
