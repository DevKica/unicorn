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
import { createUserBody, changePasswordBody, loginBody, setNewPasswordBody, invalidEmailSchema } from "./user.auth";
import { changePasswordSchema, createUserSchema, emailSchema, generalInfoSchema, logInSchema, mainMatchingfInfoSchema, passwordWithRepetitionSchema } from "../../validation/user.schema";
import { updateUserProfileBody } from "./user.relations";

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
export const InvalidEmailBodyInstance = new InvalidRequestedBody(validate(emailSchema, { email: invalidEmailSchema }).error);
export const InvalidUpdateUserGeneralInfoInstance = new InvalidRequestedBody(validate(generalInfoSchema, updateUserProfileBody.invalid.general).error);
export const InvalidUpdateUserMatchingInfoInstance = new InvalidRequestedBody(validate(mainMatchingfInfoSchema, updateUserProfileBody.invalid.matching).error);

export const apiVersion = "v1";
