// @ts-nocheck

import { validate } from "../../middleware/schemaValidation";
import {
    CannotRewindNewPair,
    EmailAlreadyExists,
    EmailNotVerified,
    FileRequired,
    Forbidden,
    InvalidCredentials,
    InvalidFileFormat,
    InvalidPassword,
    InvalidRequestedBody,
    NotFound,
    NumberOfLikesExceeded,
    PhotoRequired,
    RewindOnlyLastLikedUser,
    ServerError,
    TooLargeFile,
    Unauthorized,
    UpgradeYourAccount,
    VoiceClipTooLong,
    VoiceClipTooShort,
} from "../../utils/errors/main";
import { createUserData, changePasswordData, userLoginData, setNewPasswordData, invalidEmailSchema, invalidPasswordSchema } from "./user.auth";
import { changePasswordSchema, createUserSchema, emailSchema, logInSchema, passwordWithRepetitionSchema, singlePasswordSchema } from "../../validation/user.auth.schema";
import { createFileMessageData, createLikeData, createTextMessageData, deleteMessageData, renameConversationData, updateUserProfileData } from "./user.relations";
import { generalInfoSchema, matchingInfoSchema } from "../../validation/user.profile.schema";
import { createFileMessageSchema, createLikeSchema, createTextMessageSchema, deleteMessageSchema, renameConversationSchema } from "../../validation/user.matching.schema";

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
export const VoiceClipTooShortInstance = new VoiceClipTooShort();
export const VoiceClipTooLongInstance = new VoiceClipTooLong();
export const TooLargeFileInstance = new TooLargeFile();
export const NumberOfLikesExceededInstance = new NumberOfLikesExceeded();
export const CannotRewindNewPairInstance = new CannotRewindNewPair();
export const RewindOnlyLastLikedUserInstance = new RewindOnlyLastLikedUser();

export const InvalidCreateUserBodyInstance = new InvalidRequestedBody(validate(createUserSchema, createUserData.body.invalid.schema).error);
export const InvalidLoginBodyInstance = new InvalidRequestedBody(validate(logInSchema, userLoginData.body.invalid.schema).error);
export const InvalidChangePasswordBodyInstance = new InvalidRequestedBody(validate(changePasswordSchema, changePasswordData.body.invalid.schema).error);
export const InvalidSetNewPasswordBodyInstance = new InvalidRequestedBody(validate(passwordWithRepetitionSchema, setNewPasswordData.body.invalid.schema).error);
export const InvalidEmailBodyInstance = new InvalidRequestedBody(validate(emailSchema, { email: invalidEmailSchema }).error);
export const InvalidUpdateUserGeneralInfoInstance = new InvalidRequestedBody(validate(generalInfoSchema, updateUserProfileData.body.invalid.general).error);
export const InvalidUpdateUserMatchingInfoInstance = new InvalidRequestedBody(validate(matchingInfoSchema, updateUserProfileData.body.invalid.matching).error);
export const InvalidPasswordSchemaInstance = new InvalidRequestedBody(validate(singlePasswordSchema, { password: invalidPasswordSchema }).error);
export const InvalidCreateLikeInstance = new InvalidRequestedBody(validate(createLikeSchema, createLikeData.body.invalid.schema).error);
export const InvalidCreateTextMessageInstance = new InvalidRequestedBody(validate(createTextMessageSchema, createTextMessageData.body.invalid.schema).error);
export const InvalidCreateFileMessageInstance = new InvalidRequestedBody(validate(createFileMessageSchema, createFileMessageData.body.general.invalid.schema).error);
export const InvalidRenameConversationInstance = new InvalidRequestedBody(validate(renameConversationSchema, renameConversationData.body.invalid.schema).error);
export const InvalidDeleteMessageBodyInstnace = new InvalidRequestedBody(validate(deleteMessageSchema, deleteMessageData.body.invalid.schema).error);

export const apiVersion = "v1";
