import { Router } from "express";
import { getConversationsHandler } from "../../controllers/conversations.controllers";
import { requireActiveUser } from "../../middleware/requireUser";

const conversationsMainRoutes = Router();

conversationsMainRoutes.use("/", requireActiveUser);

conversationsMainRoutes.get("/", getConversationsHandler);

export default conversationsMainRoutes;
