import { FieldIsRequiredError, InvalidFieldError } from '@/domain/shared/errors';
import { ValueObject } from '@/shared/domain';
import { Either, left, right } from '@/shared/either';

type ErrorsEmailType = InvalidFieldError | FieldIsRequiredError;

export class EmailValueObject extends ValueObject {
  private constructor(email: string) {
    super(email);
    Object.freeze(this);
  }

  static create(email: string): Either<ErrorsEmailType, EmailValueObject> {
    if (!this.hasEmail(email)) {
      return left(new FieldIsRequiredError('Email'));
    }
    if (!this.isEmailValid(email)) {
      return left(new InvalidFieldError('Email'));
    }
    return right(new EmailValueObject(email));
  }

  private static hasEmail(email: string): boolean {
    return !!email;
  }

  private static isEmailValid(email: string): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  }
}
