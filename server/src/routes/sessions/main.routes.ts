import { Router } from "express";
import { deleteAllSessionHandler, deleteSingleSessionHandler } from "../../controllers/user/auth.controllers";

const sessionsMainRoutes = Router();

// delete single session (log out)
sessionsMainRoutes.delete("/", deleteSingleSessionHandler);

// delete all sessions (log out from all sessions)
sessionsMainRoutes.delete("/all", deleteAllSessionHandler);

export default sessionsMainRoutes;
