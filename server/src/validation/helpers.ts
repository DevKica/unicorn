import { CustomHelpers } from "joi";
import type { ShowMeGender, AccountType, SexualOrientation, TypeOfLike, UsersRelationStatus } from "@prisma/client";

const betterSingleJoiMessage = (subject: string, message: string) => {
  return `${subject} ${message}`;
};

const matchMessage = "must match";
export const matchError = (target: string) => betterSingleJoiMessage(target, matchMessage);

const regexForOnlyLetters = new RegExp(/[^\p{L}]+/gu);

// const regexExcludeLetters = new RegExp(/[\p{L}]+/gu);

export const checkIfAlphabetical = (word: string) => {
  // remove all non-alphabetical characters
  const result = word.replace(regexForOnlyLetters, "");

  // if the length has changed, the word contains non-alphabetic characters
  return result.length === word.length;
};

export const joiCheckIfAlphabetical = (value: any, helpers: CustomHelpers) => {
  // Return error if value cotains non-alphabetical characters
  if (!checkIfAlphabetical(value)) return helpers.error("any.invalid");

  // Return the value unchanged
  return value;
};

export const joiCheckEnums = (enums: string[]) => {
  const joiCheckArrayElements = (value: any, helpers: CustomHelpers) => {
    if (!enums.includes(value)) return helpers.error("any.invalid");

    return value;
  };
  return joiCheckArrayElements;
};

// Only 18+ users can create an account
const current = new Date();
const ageAllowed = 18;
const dateFullYearRestriction = current.getFullYear() - ageAllowed;
current.setFullYear(dateFullYearRestriction);

export const dateRestriction = current;

export const regexAlphabet = new RegExp("^[a-zA-Z]$");
