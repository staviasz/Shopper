export class InvalidUniqueWeekdaysError extends Error {
  constructor() {
    super('O array de dias da semana deve ter valores únicos');
  }
}
