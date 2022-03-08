import { Router } from "express";
import { getProfilePhotoHandler, getUserPrivateInfoHandler, updateUniqueUserHandler } from "../../controllers/user/user.profile.controllers";
import { requireActiveUser } from "../../middleware/requireUser";
import { schemaValidation } from "../../middleware/schemaValidation";
import { generalInfoSchema, matchingInfoSchema } from "../../validation/user.profile.schema";

const userProfileRoutes = Router();

// one exceptional not protected profile route, using to viewing photos
userProfileRoutes.get("/photo/:size/:photoName", getProfilePhotoHandler);

// middleware
userProfileRoutes.use("/", requireActiveUser);

userProfileRoutes.get("/", getUserPrivateInfoHandler);

userProfileRoutes.patch("/general", schemaValidation(generalInfoSchema), updateUniqueUserHandler);

userProfileRoutes.patch("/matching", schemaValidation(matchingInfoSchema), updateUniqueUserHandler);

export default userProfileRoutes;
