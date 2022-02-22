import { Router } from "express";
const userAuthRouter = Router();

// Verify user's email
userAuthRouter.post("/verify");

// Resend the verification email
userAuthRouter.post("/resendVerify");

// Send to the user's e-mail a link to reset the password
userAuthRouter.post("/resetPassword");

// Create new password from reset password link
userAuthRouter.patch("/newPassword");

export default userAuthRouter;
