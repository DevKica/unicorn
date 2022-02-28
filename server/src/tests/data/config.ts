// @ts-nocheck

import { validate } from "./../../middleware/schemaValidation";
import {
    EmailAlreadyExists,
    EmailNotVerified,
    Forbidden,
    InvalidCredentials,
    InvalidFileFormat,
    InvalidPassword,
    InvalidRequestedBody,
    NotFound,
    PhotoRequired,
    ServerError,
    Unauthorized,
} from "../../utils/errors/main";
import { createUserBody, changePasswordBody, loginBody, setNewPasswordBody } from "./user";
import { changePasswordSchema, createUserSchema, logInSchema, passwordWithRepetitionSchema } from "../../validation/user.schema";

export const ServerErrorInstance = new ServerError();
export const EmailAlreadyExistsInstance = new EmailAlreadyExists();
export const PhotoRequiredInstance = new PhotoRequired();
export const InvalidFileFormatInstance = new InvalidFileFormat();
export const ForbiddenInstance = new Forbidden();
export const EmailNotVerifiedInstance = new EmailNotVerified();
export const UnauthorizedInstance = new Unauthorized();
export const InvalidCredentialsInstance = new InvalidCredentials();
export const InvalidPasswordInstance = new InvalidPassword();
export const NotFoundInstance = new NotFound();

export const InvalidRequestedCreateUserBodyInstance = new InvalidRequestedBody(validate(createUserSchema, createUserBody.invalid.schema).error);
export const InvalidRequestedLoginBodyInstance = new InvalidRequestedBody(validate(logInSchema, loginBody.invalid.schema).error);
export const InvalidChangePasswordBodyInstance = new InvalidRequestedBody(validate(changePasswordSchema, changePasswordBody.invalid.schema).error);
export const InvalidSetNewPasswordBodyInstance = new InvalidRequestedBody(validate(passwordWithRepetitionSchema, setNewPasswordBody.invalid.schema).error);

export const apiVersion = "v1";
