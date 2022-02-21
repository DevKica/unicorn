import { Router } from "express";
import userMainRouter from "./user/userMainRouter";

const appMainRouter = Router();

appMainRouter.use("/user", userMainRouter);

export default appMainRouter;
