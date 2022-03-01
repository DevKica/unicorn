import { Router } from "express";
import { getUserPrivateInfoHandler } from "../../controllers/user.profile.controllers";

const userProfileRoutes = Router();

userProfileRoutes.get("/private", getUserPrivateInfoHandler);

export default userProfileRoutes;
