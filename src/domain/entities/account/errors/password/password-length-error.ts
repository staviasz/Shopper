export class PasswordLengthError extends Error {
  constructor(passwordLength: number) {
    if (passwordLength > 32) {
      super("Password length can't be higher than 32 letters");
    } else {
      super("Password length can't be lower than 8 letters");
    }
    this.name = 'PasswordLengthError';
  }
}
