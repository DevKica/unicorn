import { Router } from "express";
import { createFileMessageHandler, createTextMessageHandler } from "../../controllers/messages.controllers";
import { requireActiveUser } from "../../middleware/requireUser";
import { schemaValidation } from "../../middleware/schemaValidation";
import { createTextMessageSchema, createFileMessageSchema } from "../../validation/user.matching.schema";

const messagesMainRoutes = Router();

messagesMainRoutes.use("/", requireActiveUser);

// create message

messagesMainRoutes.post("/text", schemaValidation(createTextMessageSchema), createTextMessageHandler);
messagesMainRoutes.post("/file", schemaValidation(createFileMessageSchema), createFileMessageHandler);

export default messagesMainRoutes;
