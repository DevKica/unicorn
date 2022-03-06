import Joi from "joi";
import { joiValidateEnums } from "./helpers/functions";
import { TypeOfLike } from "@prisma/client";

export const createLikeSchema = Joi.object({
    judgedUserId: Joi.string().required(),
    typeOfLike: Joi.string()
        .required()
        .custom(joiValidateEnums(Object.keys(TypeOfLike))),
});
