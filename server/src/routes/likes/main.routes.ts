import { Router } from "express";
import { createLikeHandler } from "../../controllers/likes.controllers";
import { requireActiveUser } from "../../middleware/requireUser";
import { schemaValidation } from "../../middleware/schemaValidation";
import { createLikeSchema } from "../../validation/user.matching.schema";

const likesMainRoutes = Router();

likesMainRoutes.use("/", requireActiveUser);

// create like
likesMainRoutes.post("/", schemaValidation(createLikeSchema), createLikeHandler);

export default likesMainRoutes;
