// @ts-nocheck

import { validate } from "./../../middleware/schemaValidation";
import {
    EmailAlreadyExists,
    EmailNotVerified,
    FileRequired,
    Forbidden,
    InvalidCredentials,
    InvalidFileFormat,
    InvalidPassword,
    InvalidRequestedBody,
    NotFound,
    PhotoRequired,
    ServerError,
    Unauthorized,
    UpgradeYourAccount,
} from "../../utils/errors/main";
import { createUserBody, changePasswordBody, loginBody, setNewPasswordBody, invalidEmailSchema, invalidPasswordSchema } from "./user.auth";
import { changePasswordSchema, createUserSchema, emailSchema, logInSchema, passwordWithRepetitionSchema, singlePasswordSchema } from "../../validation/user.auth.schema";
import { createLikeBody, createTextMessageBody, updateUserProfileBody } from "./user.relations";
import { generalInfoSchema, matchingInfoSchema } from "../../validation/user.profile.schema";
import { createFileMessageSchema, createLikeSchema, createTextMessageSchema } from "./../../validation/user.matching.schema";

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
export const UpgradeYourAccountInstance = new UpgradeYourAccount();
export const FileRequiredInstance = new FileRequired();

export const InvalidRequestedCreateUserBodyInstance = new InvalidRequestedBody(validate(createUserSchema, createUserBody.invalid.schema).error);
export const InvalidRequestedLoginBodyInstance = new InvalidRequestedBody(validate(logInSchema, loginBody.invalid.schema).error);
export const InvalidChangePasswordBodyInstance = new InvalidRequestedBody(validate(changePasswordSchema, changePasswordBody.invalid.schema).error);
export const InvalidSetNewPasswordBodyInstance = new InvalidRequestedBody(validate(passwordWithRepetitionSchema, setNewPasswordBody.invalid.schema).error);
export const InvalidEmailBodyInstance = new InvalidRequestedBody(validate(emailSchema, { email: invalidEmailSchema }).error);
export const InvalidUpdateUserGeneralInfoInstance = new InvalidRequestedBody(validate(generalInfoSchema, updateUserProfileBody.invalid.general).error);
export const InvalidUpdateUserMatchingInfoInstance = new InvalidRequestedBody(validate(matchingInfoSchema, updateUserProfileBody.invalid.matching).error);
export const InvalidPasswordSchemaInstance = new InvalidRequestedBody(validate(singlePasswordSchema, { password: invalidPasswordSchema }).error);
export const InvalidCreateLikeInstance = new InvalidRequestedBody(validate(createLikeSchema, createLikeBody.invalid.schema).error);
export const InvalidCreateTextMessageInstance = new InvalidRequestedBody(validate(createTextMessageSchema, createTextMessageBody.invalid.schema).error);
export const InvalidCreateFileMessageInstance = new InvalidRequestedBody(validate(createFileMessageSchema, { conversationId: "12", type: "invalidPhoto123heh" }).error);

export const apiVersion = "v1";
