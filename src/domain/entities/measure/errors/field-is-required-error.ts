import { CustomError } from '@/domain/entities/measure/errors/custon-error';

export class FieldIsRequiredError extends CustomError {
  constructor(field: string) {
    super({ error_code: 'INVALID_DATA', error_description: `O campo ${field} é obrigatório` });
  }
}
