import { InvalidName } from '@/domain/entities/customer/errors';
import { FieldIsRequired } from '@/domain/shared/errors';
import { ValueObject } from '@/shared/domain';
import { Either, left, right } from '@/shared/either';

type ErrorsName = InvalidName | FieldIsRequired;

export class Name extends ValueObject {
  private constructor(name: string) {
    super(name);
    Object.freeze(this);
  }

  static create(name: string): Either<ErrorsName, Name> {
    if (!this.hasName(name)) {
      return left(new FieldIsRequired('Name'));
    }
    if (!this.isNameValid(name)) {
      return left(new InvalidName());
    }
    return right(new Name(name.trim()));
  }

  private static hasName(name: string): boolean {
    return !!name;
  }

  private static isNameValid(name: string): boolean {
    return /^[a-zA-ZÀ-ÿ\s~]+$/.test(name);
  }
}
