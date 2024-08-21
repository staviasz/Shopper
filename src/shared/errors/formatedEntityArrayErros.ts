import { CustomError } from '@/shared/either';
export class FormatedEntityArrayErrors extends Error implements CustomError {
  private _messages: string[];
  value: any;

  constructor(messages: string[]) {
    super('FormatedEntityArrayErrors');
    this.name = 'FormatedEntityArrayErrors';
    this.message = 'Ocorreram erros no formulário';
    this._messages = messages;
  }

  errorFormatted(): { errors: string[] } {
    return { errors: this._messages };
  }
}
