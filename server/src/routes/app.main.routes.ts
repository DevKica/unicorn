import { Request, Response, Router } from "express";
import userMainRoutes from "./user/main.routes";
import { UploadedFile } from "express-fileupload";
import { promisify } from "util";
import path from "path";
import { applyToResponse } from "../utils/errors/applyToResponse";

const appMainRoutes = Router();

appMainRoutes.post("/", async (req: Request, res: Response) => {
    console.log(req.body);
    console.log(req.files);
    if (req.files) {
        applyToResponse(res, 200, { msg: "2115" });
    } else {
        applyToResponse(res, 400, { msg: "2115" });
    }
});

appMainRoutes.use("/users", userMainRoutes);

export default appMainRoutes;
