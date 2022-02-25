import { Router } from "express";
import { createUserHandler, loginUserHandler } from "../../controllers/auth/auth.controllers";
import { schemaValidation } from "../../middleware/schemaValidation";
import { createUserSchema } from "../../validation/user.schema";

const userMainRoutes = Router();

// Create user
userMainRoutes.post("/", schemaValidation(createUserSchema), createUserHandler);

// Login user
userMainRoutes.post("/login", loginUserHandler);

// Update user general info
userMainRoutes.patch("/general");

// Route for testing purpose
userMainRoutes.get("/", (req, res) => {
    res.json("12");
});

export default userMainRoutes;
