import { validateName, validateEmail, validatePassword,  } from "./validators";

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
