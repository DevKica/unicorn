export const schemaValidation = (schema: any, objToValidate: Object) => {
  const error = schema.validate(objToValidate, { abortEarly: false });
  console.log(error);
  // if (error) {
  //     console.log();
  //     return respond;
  // }
  return error;
  return false;
};
