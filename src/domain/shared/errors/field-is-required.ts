export class FieldIsRequired extends Error {
  constructor(field: string) {
    super(`${field} is required`);
  }
}
