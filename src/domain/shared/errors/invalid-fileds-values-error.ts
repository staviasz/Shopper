export class InvalidFieldsValuesError extends Error {
  constructor(field: string, values: string[]) {
    super(`O campo ${field} deve ter um dos seguintes valores: ${values.join(', ')}`);
  }
}
