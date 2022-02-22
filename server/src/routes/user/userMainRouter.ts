import { Router } from "express";
const userMainRouter = Router();

// Create user
userMainRouter.post("/");

// Login user
userMainRouter.post("/login");

// Update user general info
userMainRouter.patch("/general");

// Route for testing purpose
userMainRouter.get("/", (req, res) => {
  res.json("12");
});

export default userMainRouter;
