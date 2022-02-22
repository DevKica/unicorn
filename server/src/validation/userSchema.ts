import Joi from "Joi";
import JoiDate from "@joi/date";
import { dateRestriction, joiCheckEnums, joiCheckIfAlphabetical, matchError, regexAlphabet } from "./helpers";
import { SexualOrientation } from "@prisma/client";

const JoiExtend = Joi.extend(JoiDate); // extend Joi with Joi Date

export const testSchemaMethod = Joi.object({
  name: Joi.string().trim().custom(joiCheckIfAlphabetical, "custom validation"),
  sexualOrientation: Joi.array()
    .required()
    .items(Joi.string().custom(joiCheckEnums(Object.keys(SexualOrientation)))),
});

const generalInfoSchema = {
  name: Joi.string().trim().required().min(2).max(128).pattern(regexAlphabet),
  surname: Joi.string().trim().required().min(2).max(128).pattern(regexAlphabet),
  gender: Joi.string().trim().required().min(2).max(128),
  birthday: JoiExtend.date().required().format("YYYY-MM-DD").min("1900-01-01").max(dateRestriction),
  // sexualOrientation: Joi.array().required().items(Joi.string().custom("joiC")),
};

export const passwordCheck = {
  password: Joi.string().trim().required().alphanum(),
};

export const passwordCheckSchema = Joi.object({
  ...passwordCheck,
});

export const passwordsSchema = {
  ...passwordCheck,
  repeatPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .label("Repeat password")
    .messages({
      "any.only": matchError(`"Passwords"`),
    }),
};

export const multiPasswordsCheckSchema = Joi.object(passwordsSchema);

export const emailSchema = {
  email: Joi.string().email({ minDomainSegments: 2 }).required().label("Email"),
};

export const setNewPasswordSchema = Joi.object({
  ...passwordsSchema,
});

export const checkEmailSchema = Joi.object({
  ...emailSchema,
});

export const createUserSchema = Joi.object({
  ...emailSchema,
  ...passwordsSchema,
  ...generalInfoSchema,
});

export const generalUserSchema = Joi.object({
  ...generalInfoSchema,
});

export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string(),
  ...passwordsSchema,
});

export const validatePasswordSchema = Joi.object({
  ...passwordCheck,
});

export const validateEmailSchema = Joi.object({
  ...emailSchema,
});
