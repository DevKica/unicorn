import { Router } from "express";
import { getConversationsHandler, changeConversationNameHandler as renameConversationHandler } from "../../controllers/conversations.controllers";
import { schemaValidation } from "../../middleware/schemaValidation";
import { renameConversationSchema } from "../../validation/user.matching.schema";

const conversationsMainRoutes = Router();

conversationsMainRoutes.get("/", getConversationsHandler);

conversationsMainRoutes.patch("/name", schemaValidation(renameConversationSchema), renameConversationHandler);
// conversationsMainRoutes.get("/:conversationId", getSingleConversationHandler);

export default conversationsMainRoutes;
