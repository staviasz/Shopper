import { ValueObject } from '@/shared/domain';
import { Either, left, right } from '@/shared/either';
import { InvalidEmailFormatError } from '../../errors';
import { InvalidPasswordFormatError } from '../../errors/password/invalid-password-format-error';

export class Password extends ValueObject {
  private constructor(password: string) {
    super(password);
    Object.freeze(this);
  }

  static create(password: string): Either<InvalidEmailFormatError, Password> {
    if (!this.validate(password)) {
      return left(new InvalidPasswordFormatError());
    }

    return right(new Password(password));
  }

  static validate(password: string): boolean {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,32}$/;
    return regex.test(password);
  }
}
