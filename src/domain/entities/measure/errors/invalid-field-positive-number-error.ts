export class InvalidFieldPositiveNumberError extends Error {
  constructor(field: string) {
    super(`O campo ${field} deve ser um número positivo`);
  }
}
