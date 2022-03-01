import { Router } from "express";
import { schemaValidation } from "../../middleware/schemaValidation";
import { createUserSchema, logInSchema } from "../../validation/user.schema";
import { createUserHandler, loginUserHandler } from "../../controllers/auth/auth.controllers";
import { requireActiveUser, requireUser } from "../../middleware/requireUser";
import { changeEmailHandler } from "../../controllers/email.controllers";
// routes
import mainUserAuthRoutes from "./auth.routes";
import userProfileRoutes from "./profile.routes";
import { getProfilePhotoHandler } from "../../controllers/user.profile.controllers";

const userMainRoutes = Router();

// Create user
userMainRoutes.post("/", schemaValidation(createUserSchema), createUserHandler);

// Login user
userMainRoutes.post("/login", schemaValidation(logInSchema), loginUserHandler);

// change user email
userMainRoutes.patch("/email", [schemaValidation(logInSchema), requireUser], changeEmailHandler);

// main auth routes
userMainRoutes.use("/auth", mainUserAuthRoutes);

// profile routes

userMainRoutes.get("/profile/photo/:size/:photoName", getProfilePhotoHandler);

userMainRoutes.use("/profile", requireActiveUser, userProfileRoutes);

export default userMainRoutes;
