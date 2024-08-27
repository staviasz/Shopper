import { CustomError } from '@/domain/entities/measure/errors/custon-error';

export class FieldIsRequiredError extends CustomError {
  constructor(field: string) {
    super({ error_code: 'FIELD_IS_REQUIRED', error_description: `O campo ${field} é obrigatório` });
  }
}
