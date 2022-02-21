import { Router } from "express";
const userMainRouter = Router();

userMainRouter.get("/", (req, res) => {
  res.json("12");
});

export default userMainRouter;
