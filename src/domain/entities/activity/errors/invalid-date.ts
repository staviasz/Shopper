export class InvalidDate extends Error {
  constructor() {
    super('Este campo deve ser uma data');
  }
}
