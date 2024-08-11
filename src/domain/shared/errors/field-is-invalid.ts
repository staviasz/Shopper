export class InvalidField extends Error {
  constructor(field: string) {
    super(`${field} is invalid`);
  }
}
