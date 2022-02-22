// regexes
export const regexAlphabet = new RegExp("^[a-zA-Z]$");

export const passwordRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,128}$/g);

// regex for alphabet in all languages and
// accepting for instance 你好我是帕維爾, Man könnte sagen

export const regexAlphabetAllLanguages = new RegExp(/[^\p{L}]+/gu);

// const regexExcludeLetters = new RegExp(/[\p{L}]+/gu);
