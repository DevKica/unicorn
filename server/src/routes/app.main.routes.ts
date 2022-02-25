import { Request, Response, Router } from "express";
import userMainRoutes from "./user/main.routes";
import { applyToResponse, applyToResponseError } from "../utils/errors/applyToResponse";
import { uploadUserPhotosFromReq } from "../utils/user/upload/uploadToDir";

const appMainRoutes = Router();

appMainRoutes.post("/", async (req: Request, res: Response) => {
    try {
        const uploadPhotos = await uploadUserPhotosFromReq(req);
        console.log(uploadPhotos);
        applyToResponse(res, 200, { msg: "2115" });
    } catch (e: unknown) {
        applyToResponseError(res, e);
    }
});

appMainRoutes.use("/users", userMainRoutes);

export default appMainRoutes;
