export class PasswordHasSpaceError extends Error {
  constructor() {
    super("Password can't have space.");
    this.name = 'PasswordHasSpaceError';
  }
}
