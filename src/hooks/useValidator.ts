export interface IValidationResult {
    email: string | boolean,
    password: string | boolean,
    pin: string | boolean,
    product: string | boolean,
    firstName: string | boolean ,
    lastName: string | boolean,
    imei: string | boolean,
    colorOfDevice: string | boolean,
    phoneModel: string | boolean,
    purchaseDate: string | boolean,
    receipt: string | boolean,
    picture: string | boolean
}

export const useValidator = () => {
  const isLength = (val: string, l: number, err: string) =>
    val.length === l ? true : err;

  const minLength = (val: string, l: number, err: string) =>
    val.length > l ? true : err;

  const isContains = (val: string, item: string, err: string) =>
    val.includes(item) ? true : err;

  const isNotContains = (val: string, item: string, err: string) =>
    !val.includes(item) ? true : err;

  const isFile = (file: any, err: string) => 
   file ? true : err
      

  const warnings = {
    email: [
      "Email should have at least 6 characters",
      "Email should contain @",
      "Email should contain .",
    ],
    password: [
      "Password should have at least 6 characters",
      "Password should not contains whitespaces",
    ],
    textField: ["Field value is too short"],
    pin: ["Pin should have 4 characters"],
    product: ["Select product"],
    file: ["Please upload file"]
  };

  const validators = (type: string, value: any) => {
    switch (type) {
      case "email":
        return (
          minLength(value, 5, warnings.email[0]) &&
          isContains(value, "@", warnings.email[1]) &&
          isContains(value, ".", warnings.email[2])
        );

      case "firstName":
      case "lastName":
        return minLength(value, 2, warnings.textField[0]);
      case "password":
        return minLength(value, 5, warnings.password[0]) && isNotContains(value, " ", warnings.password[1]);
      case "pin":
        return isLength(value, 4, warnings.pin[0]);
      case "product":
      case "colorOfDevice":
      case "imei": 
      case "phoneModel":
          return minLength(value, 1, warnings.textField[0]);
      case "purchaseDate":
          return minLength(value, 1, warnings.textField[0]);
      case "receipt":
      case "picture":
          return isFile(value, warnings.file[0])
      default:
        return false;
    }
  };

  const validate = (fields: any) => {
    const result: any = {};
    for (let field in fields) {
      result[field] = validators(field, fields[field]);
    }
    console.log("validation result:", result);
    return { result, passed: Object.values(result).every((e) => e === true) };
  };
  return validate;
};
