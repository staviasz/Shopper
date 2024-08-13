export class InvalidFormatTitleError extends Error {
  constructor() {
    super('O título deve ter entre 3 e 50 caracteres');
  }
}
