import Joi from "joi";
import { joiValidateEnums } from "./helpers/functions";
import { TypeOfLike, MessageType } from "@prisma/client";

export const createLikeSchema = Joi.object({
    judgedUserId: Joi.string(),
    typeOfLike: Joi.string().custom(joiValidateEnums(Object.keys(TypeOfLike))),
}).options({ presence: "required" });

export const joiCreateFileMessage = {
    type: Joi.string()
        .custom(joiValidateEnums(Object.keys(MessageType)))
        .invalid("info", "default"),
    conversationId: Joi.string(),
};

export const createFileMessageSchema = Joi.object(joiCreateFileMessage).options({ presence: "required" });

export const createTextMessageSchema = Joi.object({
    content: Joi.string().min(1).max(1000),
    conversationId: Joi.string(),
}).options({ presence: "required" });

export const renameConversationSchema = Joi.object({
    conversationId: Joi.string(),
    name: Joi.string().min(1).max(70),
}).options({ presence: "required" });
