import { Router } from "express";
import userMainRouter from "./user/userMainRouter";

const appMainRouter = Router();

appMainRouter.use("/users", userMainRouter);

export default appMainRouter;
