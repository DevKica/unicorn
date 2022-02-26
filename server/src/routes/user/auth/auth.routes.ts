import { Router } from "express";
import { returnSuccess } from "../../../controllers/auth/auth.controllers";
import { verifyEmailHandler } from "../../../controllers/email.controllers";
import { requireUser, requireActiveUser } from "../../../middleware/requireUser";

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
publicUserAuthRoutes.post("/verify-email", verifyEmailHandler);

// Send to the user's e-mail a link to reset the password
publicUserAuthRoutes.post("/reset-password");

// Create new password from reset password link
publicUserAuthRoutes.patch("/set-new-password");

// REQUIRE USER ROUTES

// Resend the verification email
userAuthRoutes.post("/resend-verification-email");

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
