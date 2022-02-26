import { Router } from "express";
import { returnSuccess } from "../../controllers/auth/auth.controllers";
import { requireUser, requireActiveUser } from "../../middleware/requireUser";

const userAuthRoutes = Router();

userAuthRoutes.post("/", requireUser, returnSuccess);

userAuthRoutes.post("/active", requireActiveUser, returnSuccess);

// Verify user's email
userAuthRoutes.post("/verify");

// Resend the verification email
userAuthRoutes.post("/resendVerify");

// Send to the user's e-mail a link to reset the password
userAuthRoutes.post("/resetPassword");

// Create new password from reset password link
userAuthRoutes.patch("/newPassword");

export default userAuthRoutes;
