import { Router } from "express";
import { getConversationsHandler, getSingleConversationHandler } from "../../controllers/conversations.controllers";
import { requireActiveUser } from "../../middleware/requireUser";

const conversationsMainRoutes = Router();

conversationsMainRoutes.use("/", requireActiveUser);

conversationsMainRoutes.get("/", getConversationsHandler);

conversationsMainRoutes.get("/:conversationId", getSingleConversationHandler);

export default conversationsMainRoutes;
