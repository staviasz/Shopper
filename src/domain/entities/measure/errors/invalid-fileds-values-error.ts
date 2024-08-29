import { CustomError } from './custon-error';

export class InvalidFieldsValuesError extends CustomError {
  constructor(field: string, values: string[]) {
    super({
      error_code: 'INVALID_DATA',
      error_description: `O campo ${field} deve ter um dos seguintes valores: ${values.join(', ')}`,
    });
  }
}
