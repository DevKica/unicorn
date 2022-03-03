import { Request, Response, Router } from "express";
import usersMainRoutes from "./users/main.routes";
import sessionsMainRoutes from "./sessions/main.routes";
import { applyToResponse, applyToResponseCustom } from "../utils/errors/applyToResponse";

const appMainRoutes = Router();

appMainRoutes.post("/", async (req: Request, res: Response) => {
    try {
        console.log("LOCALS");
        console.log(res.locals.user);
        console.log("END OF LOCALS");
        applyToResponse(res, 200, { msg: "2115" });
    } catch (e: unknown) {
        applyToResponseCustom(res, e);
    }
});

appMainRoutes.use("/users", usersMainRoutes);

appMainRoutes.use("/sessions", sessionsMainRoutes);

export default appMainRoutes;
