import { CustomError } from './custon-error';

export class InvalidFieldsValuesError extends CustomError {
  constructor(field: string, values: string[]) {
    super({
      error_code: 'INVALID_FIELD_VALUES',
      error_description: `O campo ${field} deve ter um dos seguintes valores: ${values.join(', ')}`,
    });
  }
}
