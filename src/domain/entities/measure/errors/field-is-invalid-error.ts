import { CustomError } from '@/domain/entities/measure/errors/custon-error';

export class InvalidFieldError extends CustomError {
  constructor(field: string) {
    super({ error_code: 'INVALID_FIELD', error_description: `O campo ${field} está inválido` });
  }
}
