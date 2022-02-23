import { Router } from "express";
import { createUserHandler } from "../../controllers/auth/auth.controllers";
import { schemaValidation } from "../../middleware/schemaValidation";
import { createUserSchema } from "../../validation/user.schema";

const userMainRoutes = Router();

// Create user
userMainRoutes.post("/", schemaValidation(createUserSchema), createUserHandler);

// Login user
userMainRoutes.post("/login");

// Update user general info
userMainRoutes.patch("/general");

// Route for testing purpose
userMainRoutes.get("/", (req, res) => {
    res.json("12");
});

export default userMainRoutes;
