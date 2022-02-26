// @ts-nocheck

import { createUserSchema, logInSchema } from "../../validation/user.schema";
import { validate } from "./../../middleware/schemaValidation";
import { invalidCreateUserBody, invalidLoginBody } from "./users";
import {
    EmailAlreadyExists,
    EmailNotVerified,
    Forbidden,
    InvalidCredentials,
    InvalidFileFormat,
    InvalidPassword,
    InvalidRequestedBody,
    PhotoRequired,
    ServerError,
    Unauthorized,
} from "../../utils/errors/main";

export const apiVersion = "v1";

export const ServerErrorInstance = new ServerError();
export const EmailAlreadyExistsInstance = new EmailAlreadyExists();
export const PhotoRequiredInstance = new PhotoRequired();
export const InvalidFileFormatInstance = new InvalidFileFormat();
export const ForbiddenInstance = new Forbidden();
export const EmailNotVerifiedInstance = new EmailNotVerified();
export const UnauthorizedInstance = new Unauthorized();
export const InvalidCredentialsInstance = new InvalidCredentials();
export const InvalidPasswordInstance = new InvalidPassword();

export const InvalidRequestedBodyInstance = new InvalidRequestedBody(validate(createUserSchema, invalidCreateUserBody).error);
export const InvalidRequestedLoginBodyInstance = new InvalidRequestedBody(validate(logInSchema, invalidLoginBody).error);
