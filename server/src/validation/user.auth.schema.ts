import Joi, { CustomHelpers } from "Joi";
import JoiDate from "@joi/date";
import { SexualOrientation, ShowMeGender } from "@prisma/client";
import { matchError } from "./helpers/betterSingleJoiMessage";
import { dateRestriction } from "./helpers/constants";
import { joiValidateEnums } from "./helpers/functions";
import { regexLongitude, regexLatitude, regexBasicAlphabet, regexPassword } from "./helpers/regexes";

// extend Joi with Joi Date
const JoiExtend = Joi.extend(JoiDate);

// Birthday is immutable after user is created
const joiBirthday = {
    birthday: JoiExtend.date().required().format("YYYY-MM-DD").min("1900-01-01").max(dateRestriction),
};

export const joiLocation = {
    longitude: Joi.custom((value: string, helpers: CustomHelpers) => {
        if (!regexLongitude.test(value)) return helpers.error("any.invalid");
        return value;
    }),

    latitude: Joi.custom((value: string, helpers: CustomHelpers) => {
        if (!regexLatitude.test(value)) return helpers.error("any.invalid");
        return value;
    }),
};

export const joiGeneralInfo = {
    name: Joi.string().trim().min(2).max(128).pattern(regexBasicAlphabet),
    surname: Joi.string().trim().min(2).max(128).pattern(regexBasicAlphabet),
    gender: Joi.string().trim().min(2).max(128),
    sexualOrientation: Joi.array()
        .unique()
        .max(3)
        .items(Joi.string().custom(joiValidateEnums(Object.keys(SexualOrientation)))),
};

export const joiShowMeGender = {
    showMeGender: Joi.string()
        .trim()
        .custom(joiValidateEnums(Object.keys(ShowMeGender))),
};

const joiSinglePassword = {
    password: Joi.string().trim().required().min(2).max(128).pattern(regexPassword),
};

const joiPasswordWithRepetition = {
    ...joiSinglePassword,
    passwordRepetition: Joi.any()
        .valid(Joi.ref("password"))
        .required()
        .label("password repetition")
        .messages({
            "any.only": matchError(`"passwords"`),
        }),
};

const joiEmail = {
    email: Joi.string().trim().email().required(),
};

export const passwordWithRepetitionSchema = Joi.object({
    ...joiPasswordWithRepetition,
});

export const emailSchema = Joi.object({
    ...joiEmail,
});

export const logInSchema = Joi.object({
    ...joiEmail,
    ...joiSinglePassword,
});

const requiredJoiGeneralInfo = Joi.object({ ...joiGeneralInfo, ...joiLocation, ...joiShowMeGender }).options({ presence: "required" });

export const createUserSchema = Joi.object({
    ...joiEmail,
    ...joiPasswordWithRepetition,
    ...joiBirthday,
    ...joiShowMeGender,
}).concat(requiredJoiGeneralInfo);

export const changePasswordSchema = Joi.object({
    oldPassword: Joi.string().required().trim(),
    ...joiPasswordWithRepetition,
});

export const singlePasswordSchema = Joi.object({
    ...joiSinglePassword,
});
