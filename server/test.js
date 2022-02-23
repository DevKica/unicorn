import pkg from "lodash";
const { omit } = pkg;
console.log(omit({ password: "hello", name: "name" }, "password"));
const age = 23;
let showMeAgeLowerLimit = age - 4 < 18 ? 18 : age - 4;
console.log(showMeAgeLowerLimit);
