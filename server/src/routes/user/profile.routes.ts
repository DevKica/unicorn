import { Router } from "express";
import { getUserPrivateInfoHandler, updateUniqueUserHandler } from "../../controllers/user.profile.controllers";
import { schemaValidation } from "../../middleware/schemaValidation";
import { generalInfoSchema } from "../../validation/user.schema";

const userProfileRoutes = Router();

userProfileRoutes.get("/private", getUserPrivateInfoHandler);

userProfileRoutes.patch("/general", schemaValidation(generalInfoSchema), updateUniqueUserHandler);

export default userProfileRoutes;
