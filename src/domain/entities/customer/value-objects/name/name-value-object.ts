import { InvalidNameError } from '@/domain/entities/customer/errors';
import { FieldIsRequiredError } from '@/domain/shared/errors';
import { ValueObject } from '@/shared/domain';
import { Either, left, right } from '@/shared/either';

type ErrorsNameType = InvalidNameError | FieldIsRequiredError;

export class NameValueObject extends ValueObject {
  private constructor(name: string) {
    super(name);
    Object.freeze(this);
  }

  static create(name: string): Either<ErrorsNameType, NameValueObject> {
    if (!this.hasName(name)) {
      return left(new FieldIsRequiredError('Name'));
    }
    if (!this.isNameValid(name) || !this.isNameLengthValid(name)) {
      return left(new InvalidNameError());
    }
    return right(new NameValueObject(name.trim()));
  }

  private static hasName(name: string): boolean {
    return !!name;
  }

  private static isNameValid(name: string): boolean {
    return /^[a-zA-ZÀ-ÿ\s~]+$/.test(name);
  }

  private static isNameLengthValid(name: string): boolean {
    return name.length > 3 && name.length < 60;
  }
}
