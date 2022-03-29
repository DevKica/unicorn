import { Router } from "express";
import { activatePremiumAccountHandler } from "../controllers/premiumAccount.controllers";

const premiumAccountRoutes = Router();

premiumAccountRoutes.post("/activate/:id/:token", activatePremiumAccountHandler);

export default premiumAccountRoutes;
