export class PasswordMissingHigherCaseLetterError extends Error {
  constructor() {
    super('Password is missing at least a higher case letter.');
    this.name = 'PasswordMissingHigherCaseLetterError';
  }
}
