import { InvalidFormatDescription } from '@/domain/entities/activity/errors';
import { FieldIsRequired } from '@/domain/shared/errors';
import { ValueObject } from '@/shared/domain';
import { Either, left, right } from '@/shared/either';

type DescriptionError = FieldIsRequired | InvalidFormatDescription;

export class Description extends ValueObject {
  private constructor(value: string) {
    super(value);
    Object.freeze(this);
  }

  static create(value: string): Either<DescriptionError, Description> {
    const valueTrim = value.trim();

    if (!this.hasDescription(valueTrim)) {
      return left(new FieldIsRequired('Descrição'));
    }

    if (!this.hasCorrectDescriptionFormat(valueTrim)) {
      return left(new InvalidFormatDescription());
    }

    return right(new Description(valueTrim));
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
