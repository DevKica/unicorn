import { Router } from "express";
import { returnSuccess } from "../../controllers/user/auth.controllers";
import { requireBlackAccountType, requireGoldAccountType, requireSilverAccountType } from "../../middleware/requirePremiumAccount";
import { requireUser, requireActiveUser } from "../../middleware/requireUser";

const authMainRoutes = Router();

// Basic require user auth
authMainRoutes.post("/user", requireUser, returnSuccess);

authMainRoutes.use("/", requireActiveUser);

// Basic require active user auth
authMainRoutes.post("/active", returnSuccess);

// premium accounts

authMainRoutes.post("/silver", requireSilverAccountType, returnSuccess);
authMainRoutes.post("/gold", requireGoldAccountType, returnSuccess);
authMainRoutes.post("/black", requireBlackAccountType, returnSuccess);

export default authMainRoutes;
