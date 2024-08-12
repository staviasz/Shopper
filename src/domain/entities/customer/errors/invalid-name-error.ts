export class InvalidNameError extends Error {
  constructor() {
    super('O nome deve ter pelo menos 3 caracteres e apenas letras');
  }
}
