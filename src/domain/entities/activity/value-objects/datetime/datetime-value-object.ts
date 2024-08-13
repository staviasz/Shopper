import { DateIsInThePastError, InvalidDateError } from '@/domain/entities/activity/errors';
import { FieldIsRequiredError } from '@/domain/shared/errors';
import { ValueObject } from '@/shared/domain';
import { Either, left, right } from '@/shared/either';

export type DatetimeErrorType = FieldIsRequiredError | InvalidDateError | DateIsInThePastError;

export class DatetimeValueObject extends ValueObject<Date> {
  private constructor(value: Date) {
    super(value);
    Object.freeze(this);
  }

  static create(value: Date): Either<DatetimeErrorType, DatetimeValueObject> {
    if (!this.hasDatetime(value)) {
      return left(new FieldIsRequiredError('Data e hora'));
    }

    if (!this.isDatetimeValid(value)) {
      return left(new InvalidDateError());
    }

    if (!this.isDateInTheFuture(value)) {
      return left(new DateIsInThePastError());
    }

    return right(new DatetimeValueObject(value));
  }

  private static hasDatetime(value: Date): boolean {
    return !!value;
  }

  private static isDatetimeValid(value: Date): boolean {
    return value instanceof Date;
  }

  private static isDateInTheFuture(value: Date): boolean {
    return value > new Date();
  }
}
