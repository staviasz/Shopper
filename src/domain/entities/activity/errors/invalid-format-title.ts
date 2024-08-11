export class InvalidFormatTitle extends Error {
  constructor() {
    super('Title deve ter entre 3 e 50 caracteres');
  }
}
