import { Router } from "express";
// middlewares
import { schemaValidation } from "../../middleware/schemaValidation";
import { requireActiveUser, requireUser } from "../../middleware/requireUser";
// schemas
import { createUserSchema, logInSchema } from "../../validation/user.auth.schema";
// handlers
import { changeEmailHandler } from "../../controllers/email.controllers";
import { getProfilePhotoHandler } from "../../controllers/user.profile.controllers";
import { createUserHandler, loginUserHandler } from "../../controllers/auth/auth.controllers";
// routes
import mainUserAuthRoutes from "./auth.routes";
import userProfileRoutes from "./profile.routes";

// main local router
const usersMainRoutes = Router();

// create user
usersMainRoutes.post("/", schemaValidation(createUserSchema), createUserHandler);

// login user
usersMainRoutes.post("/login", schemaValidation(logInSchema), loginUserHandler);

// change user email
usersMainRoutes.patch("/email", [schemaValidation(logInSchema), requireUser], changeEmailHandler);

// profile routes

// one exceptional not protected profile route, using to viewing photos
usersMainRoutes.get("/profile/photo/:size/:photoName", getProfilePhotoHandler);

// merge routes

// profile
usersMainRoutes.use("/profile", requireActiveUser, userProfileRoutes);

// auth
usersMainRoutes.use("/auth", mainUserAuthRoutes);

export default usersMainRoutes;
