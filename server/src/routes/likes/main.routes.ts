import { Router } from "express";
import { createLikeHandler, rewindLikeHandler } from "../../controllers/likes.controllers";
import { schemaValidation } from "../../middleware/schemaValidation";
import { userLikesLimitter } from "../../middleware/likesLimitter";
import { createLikeSchema } from "../../validation/user.matching.schema";

const likesMainRoutes = Router();

// create like
likesMainRoutes.post("/", [schemaValidation(createLikeSchema), userLikesLimitter], createLikeHandler);

// rewind like
likesMainRoutes.delete("/:judgedUserId", rewindLikeHandler);

export default likesMainRoutes;
