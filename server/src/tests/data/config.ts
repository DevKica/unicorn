import { createUserSchema } from "../../validation/user.schema";
import { validate } from "./../../middleware/schemaValidation";
import { invalidCreateUserBody } from "./users";
import { EmailAlreadyExists, EmailNotVerified, Forbidden, InvalidFileFormat, InvalidRequestedBody, PhotoRequired, ServerError } from "../../utils/errors/main";

export const apiVersion = "v1";

export const ServerErrorInstance = new ServerError();
export const EmailAlreadyExistsInstance = new EmailAlreadyExists();
export const PhotoRequiredInstance = new PhotoRequired();
export const InvalidFileFormatInstance = new InvalidFileFormat();
export const ForbiddenInstance = new Forbidden();
export const EmailNotVerifiedInstance = new EmailNotVerified();

// @ts-ignore
export const InvalidRequestedBodyInstance = new InvalidRequestedBody(validate(createUserSchema, invalidCreateUserBody).error);
