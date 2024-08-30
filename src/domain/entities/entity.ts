import { UuidAdapter } from '@/infra/id/uuid-adapter/uuid-adapter';
import type { Either } from '@/shared/either';
import { left, right } from '@/shared/either';
import { InvalidFieldError } from './measure/errors';
import type { ObjectError } from './measure/errors/custon-error';
import { CustomError } from './measure/errors/custon-error';

type Props = { id: string } & Record<string, any>;
export abstract class Entity<T extends Props> {
  private static _errors: CustomError[] = [];
  protected readonly _id: string;

  protected constructor(protected readonly props: T) {
    this._id = props.id;
  }

  get id(): string {
    return this._id;
  }

  protected static validateId(id?: string): Either<InvalidFieldError, string> {
    const uuid = new UuidAdapter();

    if (id && !uuid.validate(id)) {
      return left(new InvalidFieldError('id'));
    }

    const returnId = id ?? uuid.build();
    return right(returnId);
  }

  protected static errors(): CustomError | null {
    if (this._errors.length === 0) return null;

    return new CustomError({ error_code: 'INVALID_DATA', error_description: this.formatErrors() });
  }

  protected static addError(error: CustomError | CustomError[]): void {
    Array.isArray(error) ? this._errors.push(...error) : this._errors.push(error);
  }

  protected static addObjectError(error: ObjectError | ObjectError[]): void {
    Array.isArray(error)
      ? this._errors.push(...error.map(err => new CustomError(err)))
      : this._errors.push(new CustomError(error));
  }

  protected static clearErrors(): void {
    this._errors = [];
  }

  protected static formatErrors(): string {
    return this._errors.map(error => error.message).join(', ');
  }
}
