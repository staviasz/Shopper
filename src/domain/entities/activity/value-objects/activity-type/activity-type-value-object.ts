import { ActivityType as TypeActivity } from '@/domain/entities/activity/types';
import { FieldIsRequired, InvalidFieldsValues } from '@/domain/shared/errors';
import { ValueObject } from '@/shared/domain';
import { Either, left, right } from '@/shared/either';

const KeysTypeActivity = Object.values(TypeActivity);

type ActivityTypeError = FieldIsRequired;

export class ActivityType extends ValueObject {
  private constructor(value: string) {
    super(value);
    Object.freeze(this);
  }

  static create(value: TypeActivity): Either<ActivityTypeError, ActivityType> {
    if (!this.hasValue(value)) {
      return left(new FieldIsRequired('Tipo'));
    }

    if (!this.isValidValue(value)) {
      return left(new InvalidFieldsValues('Tipo', KeysTypeActivity));
    }
    return right(new ActivityType(value));
  }

  private static hasValue(value: string): boolean {
    return !!value;
  }

  private static isValidValue(value: string): value is TypeActivity {
    return KeysTypeActivity.includes(value as TypeActivity);
  }
}
