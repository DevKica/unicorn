import { CustomHelpers } from "joi";
import { regexAlphabetAllLanguages } from "./regexes";

export const checkTheAlphabeticality = (word: string) => {
  // remove all non-alphabetical characters
  const result = word.replace(regexAlphabetAllLanguages, "");

  // if the length has changed, the word contains non-alphabetic characters
  return result.length === word.length;
};

export const joiValidateAlphabeticality = (value: any, helpers: CustomHelpers) => {
  // Return error if value cotains non-alphabetical characters
  if (!checkTheAlphabeticality(value)) return helpers.error("any.invalid");

  // Return the value unchanged
  return value;
};

export const joiValidateEnums = (enums: string[]) => {
  const joiValidateElement = (value: any, helpers: CustomHelpers) => {
    if (!enums.includes(value)) return helpers.error("any.invalid");

    return value;
  };
  return joiValidateElement;
};
