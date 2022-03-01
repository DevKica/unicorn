import { Router } from "express";
import { returnSuccess } from "../../controllers/auth/auth.controllers";
import { resendVerificationEmailHandler, verifyEmailHandler } from "../../controllers/email.controllers";
import { changePasswordHandler, sendPasswordResetEmailHandler, setNewPasswordHandler, verifySetNewPasswordLinkHandler } from "../../controllers/password.controllers";
import { requireUser, requireActiveUser } from "../../middleware/requireUser";
import { schemaValidation } from "../../middleware/schemaValidation";
import { changePasswordSchema, emailSchema, passwordWithRepetitionSchema } from "../../validation/user.schema";

// public router
const publicUserAuthRoutes = Router();

// user router
const userAuthRoutes = Router();

// active user router
const activeUserAuthRoutes = Router();

// main router
const mainUserAuthRoutes = Router();

// PUBLIC ROUTES

// Verify user's email
publicUserAuthRoutes.patch("/verify-email/:token", verifyEmailHandler);

// Send to the user's e-mail a link to reset the password
publicUserAuthRoutes.post("/reset-password", schemaValidation(emailSchema), sendPasswordResetEmailHandler);

// Verify if the link is valid
publicUserAuthRoutes.post("/verify-link/:token", verifySetNewPasswordLinkHandler);

// Create new password from reset password link
publicUserAuthRoutes.patch("/set-new-password/:token", schemaValidation(passwordWithRepetitionSchema), setNewPasswordHandler);

// REQUIRE USER ROUTES

// Resend the verification email
userAuthRoutes.post("/resend-verification-email", resendVerificationEmailHandler);

// Change user password
userAuthRoutes.patch("/password", schemaValidation(changePasswordSchema), changePasswordHandler);

// Basic require user test
userAuthRoutes.post("/user", returnSuccess);

// ACTIVE USER ROUTES

// Basic require active user test
activeUserAuthRoutes.post("/active", returnSuccess);

// MERGE ROUTES

mainUserAuthRoutes.use("/", publicUserAuthRoutes);

mainUserAuthRoutes.use("/", requireUser, userAuthRoutes);

mainUserAuthRoutes.use("/", requireActiveUser, activeUserAuthRoutes);

export default mainUserAuthRoutes;
