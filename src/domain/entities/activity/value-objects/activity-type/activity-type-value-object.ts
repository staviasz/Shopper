import { FieldIsRequiredError, InvalidFieldsValuesError } from '@/domain/shared/errors';
import { ValueObject } from '@/shared/domain';
import { Either, left, right } from '@/shared/either';
import { ActivityEnumType } from '../../types';

const KeysActivityEnumType = Object.values(ActivityEnumType);

type ActivityTypeError = FieldIsRequiredError | InvalidFieldsValuesError;

export class ActivityTypeValueObject extends ValueObject {
  private constructor(value: string) {
    super(value);
    Object.freeze(this);
  }

  static create(value: ActivityEnumType): Either<ActivityTypeError, ActivityTypeValueObject> {
    if (!this.hasValue(value)) {
      return left(new FieldIsRequiredError('Tipo'));
    }

    if (!this.isValidValue(value)) {
      return left(new InvalidFieldsValuesError('Tipo', KeysActivityEnumType));
    }
    return right(new ActivityTypeValueObject(value));
  }

  private static hasValue(value: string): boolean {
    return !!value;
  }

  private static isValidValue(value: string): value is ActivityEnumType {
    return KeysActivityEnumType.includes(value as ActivityEnumType);
  }
}
