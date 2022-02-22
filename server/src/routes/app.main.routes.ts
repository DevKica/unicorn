import { Router } from "express";
import userMainRoutes from "./user/main.routes";

const appMainRoutes = Router();

appMainRoutes.use("/users", userMainRoutes);

export default appMainRoutes;
