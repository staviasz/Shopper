export class PasswordMissingLowerCaseLetterError extends Error {
  constructor() {
    super('Password is missing at least a lower case letter.');
    this.name = 'PasswordMissingLowerCaseLetterError';
  }
}
