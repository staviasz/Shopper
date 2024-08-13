export class InvalidArrayInstanceError extends Error {
  constructor() {
    super('Este campo deve ser um array.');
  }
}
