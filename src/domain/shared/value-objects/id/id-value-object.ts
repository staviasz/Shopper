import { FieldIsRequiredError, InvalidFieldError } from '@/domain/shared/errors';
import { ValueObject } from '@/shared/domain';
import { Either, left, right } from '@/shared/either';

type IdErrors = FieldIsRequiredError | InvalidFieldError;

export class IdValueObject extends ValueObject {
  private constructor(value: string) {
    super(value);
    Object.freeze(this);
  }

  static create(id: string): Either<IdErrors, IdValueObject> {
    if (!this.hasId(id)) {
      return left(new FieldIsRequiredError('id'));
    }

    if (!this.isValidId(id)) {
      return left(new InvalidFieldError('id'));
    }

    return right(new IdValueObject(id));
  }

  private static hasId(id: string): boolean {
    return !!id;
  }

  private static isValidId(id: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  }
}
