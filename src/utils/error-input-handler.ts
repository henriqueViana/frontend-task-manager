import { validateEmail, validatePassword } from "./validators";

export const validationMap = {
  email: (email: string) => validateEmail(email),
  password: (password: string) => validatePassword(password),
};