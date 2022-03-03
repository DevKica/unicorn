import { Router } from "express";
import { schemaValidation } from "../../middleware/schemaValidation";
import { createUserSchema, logInSchema } from "../../validation/user.auth.schema";
import { createUserHandler, loginUserHandler } from "../../controllers/auth/auth.controllers";
import { requireActiveUser, requireUser } from "../../middleware/requireUser";
import { changeEmailHandler } from "../../controllers/email.controllers";
// routes
import mainUserAuthRoutes from "./auth.routes";
import userProfileRoutes from "./profile.routes";
import { getProfilePhotoHandler } from "../../controllers/user.profile.controllers";

const usersMainRoutes = Router();

// Create user
usersMainRoutes.post("/", schemaValidation(createUserSchema), createUserHandler);

// Login user
usersMainRoutes.post("/login", schemaValidation(logInSchema), loginUserHandler);

// change user email
usersMainRoutes.patch("/email", [schemaValidation(logInSchema), requireUser], changeEmailHandler);

// main auth routes
usersMainRoutes.use("/auth", mainUserAuthRoutes);

// profile routes

usersMainRoutes.get("/profile/photo/:size/:photoName", getProfilePhotoHandler);

usersMainRoutes.use("/profile", requireActiveUser, userProfileRoutes);

export default usersMainRoutes;
