export class InvalidFormatDescription extends Error {
  constructor() {
    super('A descrição deve ter entre 3 e 50 caracteres');
  }
}
