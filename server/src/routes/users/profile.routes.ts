import { Router } from "express";
import { getUserPrivateInfoHandler, updateUniqueUserHandler } from "../../controllers/user.profile.controllers";
import { schemaValidation } from "../../middleware/schemaValidation";
import { generalInfoSchema, matchingInfoSchema } from "../../validation/user.profile.schema";

const userProfileRoutes = Router();

userProfileRoutes.get("/", getUserPrivateInfoHandler);

userProfileRoutes.patch("/general", schemaValidation(generalInfoSchema), updateUniqueUserHandler);

userProfileRoutes.patch("/matching", schemaValidation(matchingInfoSchema), updateUniqueUserHandler);

export default userProfileRoutes;
