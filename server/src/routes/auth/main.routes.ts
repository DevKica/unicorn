import { Router } from "express";
import { returnSuccess } from "../../controllers/user/auth.controllers";
import { requireUser, requireActiveUser } from "../../middleware/requireUser";

const authMainRoutes = Router();

// Basic require user auth
authMainRoutes.post("/user", requireUser, returnSuccess);

// Basic require active user auth
authMainRoutes.post("/active", requireActiveUser, returnSuccess);

export default authMainRoutes;
