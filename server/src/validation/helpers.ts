import { CustomHelpers } from "joi";

export const betterSingleJoiMessage = (subject: string, message: string) => {
  return `${subject} ${message}`;
};

const matchMessage = "must match";
export const matchError = (target: string) => betterSingleJoiMessage(target, matchMessage);

const regexForOnlyLetters = new RegExp(/[^\p{L}]+/gu);

export const checkIfAlphabetical = (word: string) => {
  // remove all non-alphabetical characters
  const result = word.replace(regexForOnlyLetters, "");
  // if the length has changed, the word contains non-alphabetic characters
  return result.length === word.length;
};

export const joiCheckIfAlphabetical = (value: any, helpers: CustomHelpers) => {
  if (!checkIfAlphabetical(value)) {
    return helpers.error("any.invalid");
  }
  // Return the value unchanged
  return value;
};
