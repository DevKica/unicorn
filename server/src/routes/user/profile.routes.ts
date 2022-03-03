import { Router } from "express";
import { getUserPrivateInfoHandler, updateUniqueUserHandler } from "../../controllers/user.profile.controllers";
import { schemaValidation } from "../../middleware/schemaValidation";
import { generalInfoSchema, matchingfInfoSchema } from "../../validation/user.profile.schema";

const userProfileRoutes = Router();

userProfileRoutes.get("/private", getUserPrivateInfoHandler);

userProfileRoutes.patch("/general", schemaValidation(generalInfoSchema), updateUniqueUserHandler);

userProfileRoutes.patch("/matching", schemaValidation(matchingfInfoSchema), updateUniqueUserHandler);

export default userProfileRoutes;
