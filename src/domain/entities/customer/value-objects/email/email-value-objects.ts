import { FieldIsRequired, InvalidField } from '@/domain/shared/errors';
import { ValueObject } from '@/shared/domain';
import { Either, left, right } from '@/shared/either';

type ErrorsEmail = InvalidField | FieldIsRequired;

export class Email extends ValueObject {
  private constructor(email: string) {
    super(email);
    Object.freeze(this);
  }

  static create(email: string): Either<ErrorsEmail, Email> {
    if (!this.hasEmail(email)) {
      return left(new FieldIsRequired('Email'));
    }
    if (!this.isEmailValid(email)) {
      return left(new InvalidField('Email'));
    }
    return right(new Email(email));
  }

  private static hasEmail(email: string): boolean {
    return !!email;
  }

  private static isEmailValid(email: string): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  }
}
