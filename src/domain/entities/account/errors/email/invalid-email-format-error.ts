export class InvalidEmailFormatError extends Error {
  constructor(email: string) {
    super(`Invalid Email Format in:'${email}'`);
    this.name = 'InvalidEmailFormatError';
  }
}
