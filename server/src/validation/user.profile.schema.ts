import Joi, { custom } from "Joi";
import { regexBasicAlphabet } from "./helpers/regexes";
import { joiGeneralInfo, joiShowMeGender } from "./user.auth.schema";

export const joiAdditionalInfo = {
    city: Joi.string().trim().min(1).max(128).pattern(regexBasicAlphabet),
    description: Joi.string().trim().max(500),
};

const joiMatchingInfo = {
    ...joiShowMeGender,
    showMeDistance: Joi.number().min(10).max(100),
    showMeAgeLowerLimit: Joi.number().min(18).max(80),
    showMeAgeUpperLimit: Joi.number().min(20).max(100),
};

export const generalInfoSchema = Joi.object({
    ...joiGeneralInfo,
    ...joiAdditionalInfo,
});

export const matchingInfoSchema = Joi.object(joiMatchingInfo).custom((obj, helpers) => {
    const { showMeAgeUpperLimit, showMeAgeLowerLimit } = obj;
    if (showMeAgeUpperLimit - showMeAgeLowerLimit < 2) {
        return helpers.error("any.invalid");
    }
    return obj;
});
