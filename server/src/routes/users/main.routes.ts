import { Router } from "express";
// middlewares
import { requireActiveUser } from "../../middleware/requireUser";
import { getProfilePhotoHandler } from "../../controllers/user/user.profile.controllers";
// routes
import userProfileRoutes from "./profile.routes";
import userRoutes from "./user.routes";

// main local router
const usersMainRoutes = Router();

// merge routes

// profile
usersMainRoutes.use("/profile", userProfileRoutes);

// user main routes
usersMainRoutes.use("/", userRoutes);

export default usersMainRoutes;
