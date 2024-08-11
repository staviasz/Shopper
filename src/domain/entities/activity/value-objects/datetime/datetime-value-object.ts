import { DateIsInThePast, InvalidDate } from '@/domain/entities/activity/errors';
import { FieldIsRequired } from '@/domain/shared/errors';
import { ValueObject } from '@/shared/domain';
import { Either, left, right } from '@/shared/either';

type DatetimeError = FieldIsRequired;

export class Datetime extends ValueObject<Date> {
  private constructor(value: Date) {
    super(value);
    Object.freeze(this);
  }

  static create(value: Date): Either<DatetimeError, Datetime> {
    if (!this.hasDatetime(value)) {
      return left(new FieldIsRequired('Data e hora'));
    }

    if (!this.isDatetimeValid(value)) {
      return left(new InvalidDate());
    }

    if (!this.isDateInTheFuture(value)) {
      return left(new DateIsInThePast());
    }

    return right(new Datetime(value));
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
