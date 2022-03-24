import { Router } from "express";
import { activatePremiumAccountHandler } from "../controllers/premiumAccount.controllers";

const premiumAccountRoutes = Router();

premiumAccountRoutes.post("/activate/:token/:id", activatePremiumAccountHandler);

export default premiumAccountRoutes;
