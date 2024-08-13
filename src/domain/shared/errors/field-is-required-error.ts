export class FieldIsRequiredError extends Error {
  constructor(field: string) {
    super(`${field} is required`);
  }
}
