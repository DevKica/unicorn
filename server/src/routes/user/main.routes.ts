import { Router } from "express";
import { schemaValidation } from "../../middleware/schemaValidation";
import { createUserSchema, logInSchema } from "../../validation/user.schema";
import { createUserHandler, loginUserHandler } from "../../controllers/auth/auth.controllers";
import mainUserAuthRoutes from "./auth/auth.routes";
import { requireUser } from "../../middleware/requireUser";
import { changeEmailHandler } from "../../controllers/email.controllers";

const userMainRoutes = Router();

// Create user
userMainRoutes.post("/", schemaValidation(createUserSchema), createUserHandler);

// Login user
userMainRoutes.post("/login", schemaValidation(logInSchema), loginUserHandler);

// Update user general info
userMainRoutes.patch("/general");

// change user email
userMainRoutes.patch("/email", [schemaValidation(logInSchema), requireUser], changeEmailHandler);

userMainRoutes.use("/auth", mainUserAuthRoutes);

export default userMainRoutes;
