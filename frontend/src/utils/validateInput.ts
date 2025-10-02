import { validateName, validateEmail, validatePassword, validateFullname, validatePhone, validateGender, validateAddress } from "./validators";

export const validateLogin = (email: string, password: string) => {
    return {
        email: validateEmail(email),
        password: validatePassword(password)
    };
};

export const validateRegister = (name: string, email: string, password: string) => {
    return {
        name: validateName(name),
        email: validateEmail(email),
        password: validatePassword(password)
    };
};

export const validateUpdateInfo = ( fullname: string, phone: string, gender: string, address: string ) => {
  return {
    fullname: validateFullname(fullname),
    phone: validatePhone(phone),
    gender: validateGender(gender),
    address: validateAddress(address),
  };
};
