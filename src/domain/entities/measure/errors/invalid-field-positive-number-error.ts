import { CustomError } from './custon-error';

export class InvalidFieldPositiveNumberError extends CustomError {
  constructor(field: string) {
    super({
      error_code: 'INVALID_DATA',
      error_description: `O campo ${field} deve ser um número positivo`,
    });
  }
}
