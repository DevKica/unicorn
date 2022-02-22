import { Router } from "express";
const userMainRoutes = Router();

// Create user
userMainRoutes.post("/");

// Login user
userMainRoutes.post("/login");

// Update user general info
userMainRoutes.patch("/general");

// Route for testing purpose
userMainRoutes.get("/", (req, res) => {
  res.json("12");
});

export default userMainRoutes;
