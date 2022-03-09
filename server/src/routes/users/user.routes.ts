import { Router } from "express";
import { createUserHandler, deleteUserHandler, loginUserHandler } from "../../controllers/user/auth.controllers";
import { changeEmailHandler, resendVerificationEmailHandler, verifyEmailHandler } from "../../controllers/email.controllers";
import { changePasswordHandler, sendPasswordResetEmailHandler, setNewPasswordHandler, verifySetNewPasswordLinkHandler } from "../../controllers/password.controllers";
import { getUsersToMatchHandler } from "../../controllers/user/user.profile.controllers";
import { requireActiveUser, requireUser } from "../../middleware/requireUser";
import { schemaValidation } from "../../middleware/schemaValidation";
import { changePasswordSchema, createUserSchema, emailSchema, logInSchema, passwordWithRepetitionSchema, singlePasswordSchema } from "../../validation/user.auth.schema";

// public
const publicUserRoutes = Router();

// require user
const requireUserRoutes = Router();

// require active user
const requireActiveUserRoutes = Router();

// main router
const userRoutes = Router();

// PUBLIC ROUTES

// create user
publicUserRoutes.post("/", schemaValidation(createUserSchema), createUserHandler);

// login user
publicUserRoutes.post("/login", schemaValidation(logInSchema), loginUserHandler);

// Verify user's email
publicUserRoutes.patch("/verify-email/:token", verifyEmailHandler);

// Send to the user's e-mail a link to reset the password
publicUserRoutes.post("/reset-password", schemaValidation(emailSchema), sendPasswordResetEmailHandler);

// Verify if the link is valid
publicUserRoutes.post("/verify-link/:token", verifySetNewPasswordLinkHandler);

// Create new password from reset password link
publicUserRoutes.patch("/new-password/:token", schemaValidation(passwordWithRepetitionSchema), setNewPasswordHandler);

// REQUIRE USER ROUTES

// Resend the verification email
requireUserRoutes.post("/resend-verification-email", resendVerificationEmailHandler);

// Change user password
requireUserRoutes.patch("/password", schemaValidation(changePasswordSchema), changePasswordHandler);

// change user email
requireUserRoutes.patch("/email", schemaValidation(logInSchema), changeEmailHandler);

// delete user account
requireUserRoutes.delete("/", schemaValidation(singlePasswordSchema), deleteUserHandler);

// REQUIRE ACTIVE ROUTES

// get users to match

requireActiveUserRoutes.get("/", getUsersToMatchHandler);

// MERGE ROUTES

userRoutes.use("/", publicUserRoutes);

userRoutes.use("/", requireUser, requireUserRoutes);

userRoutes.use("/", requireActiveUser, requireActiveUserRoutes);

export default userRoutes;
