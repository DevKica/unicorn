import { EmailAlreadyExists, InvalidRequestedBody, ServerError } from "../../utils/errors/main";
import { createUserSchema } from "../../validation/user.schema";
import { validate } from "./../../middleware/schemaValidation";
import { invalidCreateUserBody } from "./users";

export const apiVersion = "v1";

export const ServerErrorInstance = new ServerError();
export const EmailAlreadyExistsInstance = new EmailAlreadyExists();

// @ts-ignore
export const InvalidRequestedBodyInstance = new InvalidRequestedBody(validate(createUserSchema, invalidCreateUserBody).error);
