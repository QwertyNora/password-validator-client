export  type PasswordRule = {
  label: string;
  test: (password: string) => boolean;
}

export type ValidationResponse = {
  isValid: boolean;
  errors: string[];
}