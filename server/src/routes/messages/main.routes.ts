import { Router } from "express";
import { createFileMessageHandler, createTextMessageHandler, deleteMessageHandler, getFileMessageContentHandler } from "../../controllers/messages.controllers";
import { requireActiveUser } from "../../middleware/requireUser";
import { schemaValidation } from "../../middleware/schemaValidation";
import { createTextMessageSchema, createFileMessageSchema, deleteMessageSchema } from "../../validation/user.matching.schema";

const messagesMainRoutes = Router();

messagesMainRoutes.get("/:type/:fileName", getFileMessageContentHandler);

messagesMainRoutes.use("/", requireActiveUser);

// create message

messagesMainRoutes.post("/text", schemaValidation(createTextMessageSchema), createTextMessageHandler);
messagesMainRoutes.post("/file", schemaValidation(createFileMessageSchema), createFileMessageHandler);
messagesMainRoutes.delete("/", schemaValidation(deleteMessageSchema), deleteMessageHandler);

export default messagesMainRoutes;
