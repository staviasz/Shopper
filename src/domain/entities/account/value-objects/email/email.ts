import { ValueObject } from '@/shared/domain';
import { Either, left, right } from '@/shared/either';
import { InvalidEmailFormatError } from '../../errors';

export class Email extends ValueObject {
  private constructor(email: string) {
    super(email);
    Object.freeze(this);
  }

  static create(email: string): Either<InvalidEmailFormatError, Email> {
    if (!Email.validate(email)) {
      return left(new InvalidEmailFormatError(email));
    }

    return right(new Email(email));
  }

  private static validate(email: string): boolean {
    const emailRegex = /^[A-Za-z0-9](?:[A-Za-z0-9._%+-]*[A-Za-z0-9])?@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  }
}
