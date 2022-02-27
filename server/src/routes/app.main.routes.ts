import userMainRoutes from "./user/main.routes";
import { Request, Response, Router } from "express";
import { applyToResponse, applyToResponseCustom } from "../utils/errors/applyToResponse";

const appMainRoutes = Router();

appMainRoutes.post("/", async (req: Request, res: Response) => {
    try {
        applyToResponse(res, 200, { msg: "2115" });
    } catch (e: unknown) {
        applyToResponseCustom(res, e);
    }
});

appMainRoutes.use("/users", userMainRoutes);

export default appMainRoutes;
