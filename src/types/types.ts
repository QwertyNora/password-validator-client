export  type PasswordRule = {
  label: string;
  test: (password: string) => boolean;
}