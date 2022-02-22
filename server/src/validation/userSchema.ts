import Joi from "Joi";
import JoiDate from "@joi/date";
import { SexualOrientation, ShowMeGender } from "@prisma/client";
import { matchError } from "@/helpers/validation/betterSingleJoiMessage";
import { dateRestriction } from "@/helpers/validation/constants";
import { joiValidateAlphabeticality, joiValidateEnums } from "@/helpers/validation/functions";
import { regexAlphabet, passwordRegex } from "@/helpers/validation/regexes";

const JoiExtend = Joi.extend(JoiDate); // extend Joi with Joi Date

export const testSchemaMethod = Joi.object({
  name: Joi.string().trim().custom(joiValidateAlphabeticality, "custom validation"),
  sexualOrientation: Joi.array()
    .max(3)
    .required()
    .items(Joi.string().custom(joiValidateEnums(Object.keys(SexualOrientation)))),
});

// Birthday is immutable after user creation
export const joiBirthday = {
  birthday: JoiExtend.date().required().format("YYYY-MM-DD").min("1900-01-01").max(dateRestriction),
};
export const joiGeneralInfo = Joi.object({
  name: Joi.string().trim().min(2).max(128).pattern(regexAlphabet),
  surname: Joi.string().trim().min(2).max(128).pattern(regexAlphabet),
  gender: Joi.string().trim().min(2).max(128),
  sexualOrientation: Joi.array()
    .max(3)
    .items(Joi.string().custom(joiValidateEnums(Object.keys(SexualOrientation)))),
});

export const joiMatchingInfo = Joi.object({
  showMeGender: Joi.string()
    .trim()
    .custom(joiValidateEnums(Object.keys(ShowMeGender))),
});

export const joiSinglePassword = {
  password: Joi.string().trim().required().min(2).max(128).pattern(passwordRegex),
};

export const passwordCheckSchema = Joi.object({
  ...joiSinglePassword,
});

export const joiPasswordWithRepetition = {
  ...joiSinglePassword,
  repeatPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .label(`"repeat password"`)
    .messages({
      "any.only": matchError(`"passwords"`),
    }),
};

export const joiEmail = {
  email: Joi.string().email({ minDomainSegments: 2 }).required().label("Email"),
};

export const passwordWithRepetitionSchema = Joi.object({
  ...joiPasswordWithRepetition,
});

export const emailSchema = Joi.object({
  ...joiEmail,
});

export const createUserSchema = Joi.object({
  ...joiEmail,
  ...joiPasswordWithRepetition,
  ...joiBirthday,
  ...joiGeneralInfo.options({ presence: "required" }),
});

export const generalInfoSchema = Joi.object({
  ...joiGeneralInfo,
});

export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string(),
  ...joiPasswordWithRepetition,
});

export const singlePasswordSchema = Joi.object({
  ...joiSinglePassword,
});
