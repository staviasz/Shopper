export class PasswordMissingNumberError extends Error {
  constructor() {
    super('Password is missing at least a number.');
    this.name = 'PasswordMissingNumberError';
  }
}
