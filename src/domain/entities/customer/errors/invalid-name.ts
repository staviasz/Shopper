export class InvalidName extends Error {
  constructor() {
    super('O nome deve ter pelo menos 3 caracteres e apenas letras');
  }
}
