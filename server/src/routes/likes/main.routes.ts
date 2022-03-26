import { Router } from "express";
import { createLikeHandler } from "../../controllers/likes.controllers";
import { schemaValidation } from "../../middleware/schemaValidation";
import { userLikesLimitter } from "../../middleware/userLikesLimitter";
import { createLikeSchema } from "../../validation/user.matching.schema";

const likesMainRoutes = Router();

// create like
likesMainRoutes.post("/", [schemaValidation(createLikeSchema), userLikesLimitter], createLikeHandler);

export default likesMainRoutes;
