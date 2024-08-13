import { InvalidFormatDescriptionError } from '@/domain/entities/activity/errors';
import { FieldIsRequiredError } from '@/domain/shared/errors';
import { ValueObject } from '@/shared/domain';
import { Either, left, right } from '@/shared/either';

type DescriptionError = FieldIsRequiredError | InvalidFormatDescriptionError;

export class DescriptionValueObject extends ValueObject {
  private constructor(value: string) {
    super(value);
    Object.freeze(this);
  }

  static create(value: string): Either<DescriptionError, DescriptionValueObject> {
    const valueTrim = value.trim();

    if (!this.hasDescription(valueTrim)) {
      return left(new FieldIsRequiredError('Descrição'));
    }

    if (!this.hasCorrectDescriptionFormat(valueTrim)) {
      return left(new InvalidFormatDescriptionError());
    }

    return right(new DescriptionValueObject(valueTrim));
  }

  private static hasDescription(description: string): boolean {
    return !!description;
  }

  private static hasCorrectDescriptionFormat(description: string): boolean {
    if (description.length < 10 || description.length > 500) {
      return false;
    }
    return true;
  }
}
