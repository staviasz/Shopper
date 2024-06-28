export class PasswordMissingSpecialCharacterError extends Error {
  constructor() {
    super('Password is missing at least a special character');
    this.name = 'PasswordMissingSpecialCharacterError';
  }
}
