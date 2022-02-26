import { Router } from "express";
import { schemaValidation } from "../../middleware/schemaValidation";
import { createUserSchema, logInSchema } from "../../validation/user.schema";
import { createUserHandler, loginUserHandler } from "../../controllers/auth/auth.controllers";
import userAuthRoutes from "./auth.routes";

const userMainRoutes = Router();

// Create user
userMainRoutes.post("/", schemaValidation(createUserSchema), createUserHandler);

// Login user
userMainRoutes.post("/login", schemaValidation(logInSchema), loginUserHandler);

// Update user general info
userMainRoutes.patch("/general");

// Route for testing purpose
userMainRoutes.get("/", (req, res) => {
    res.json("12");
});

userMainRoutes.use("/auth", userAuthRoutes);

export default userMainRoutes;
