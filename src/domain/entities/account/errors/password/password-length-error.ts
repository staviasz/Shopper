export class PasswordLengthError extends Error {
  constructor(passwordLength: number) {
    if (passwordLength > 32) {
      super("Password length can't be higher than 32 letters");
    } else if (passwordLength < 8) {
      super("Password length can't be lower than 8 letters");
    } else {
      super('');
    }
    this.name = 'PasswordLengthError';
  }
}
