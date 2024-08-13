export class DateIsInThePastError extends Error {
  constructor() {
    super('A data não pode ser no passado');
  }
}
