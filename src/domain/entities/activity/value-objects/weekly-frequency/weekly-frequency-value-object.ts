import { WeekDaysEnumType, WeeklyFrequencyType } from '@/domain/entities/activity/types';
import {
  DatetimeErrorType,
  DatetimeValueObject,
} from '@/domain/entities/activity/value-objects/datetime/datetime-value-object';
import {
  InvalidArrayInstanceError,
  InvalidFieldPositiveNumberError,
  InvalidFieldsValuesError,
} from '@/domain/shared/errors';
import { ValueObject } from '@/shared/domain';
import { Either, left, right } from '@/shared/either';
import { InvalidUniqueWeekdaysError } from '../../errors';

type WeekDaysAcceptedType = WeekDaysEnumType[] | void;
type WeekDaysErrorsType = InvalidArrayInstanceError | InvalidFieldsValuesError | InvalidUniqueWeekdaysError;

type WeeklyFrequencyErrorsType = InvalidFieldPositiveNumberError | WeekDaysErrorsType | DatetimeErrorType;
type ResponseWeeklyFrequencyType = Either<WeeklyFrequencyErrorsType, WeeklyFrequencyValueObject>;

const keysWeekDays = Object.values(WeekDaysEnumType);

export class WeeklyFrequencyValueObject extends ValueObject<WeeklyFrequencyType> {
  private constructor(props: WeeklyFrequencyType) {
    super(props);
    Object.freeze(this);
  }

  static create(props: WeeklyFrequencyType): ResponseWeeklyFrequencyType {
    if (!this.quantityPerWeekIsValidNumber(props.quantityPerWeek)) {
      return left(new InvalidFieldPositiveNumberError('Quantidade semanal'));
    }

    const validateWeekDays = this.validWeekDays(props.weekDays);
    if (validateWeekDays.isLeft()) {
      return validateWeekDays as unknown as ResponseWeeklyFrequencyType;
    }

    const finallyDateOrUndefined = props.finallyDate && DatetimeValueObject.create(props.finallyDate);
    if (finallyDateOrUndefined && finallyDateOrUndefined.isLeft()) {
      return finallyDateOrUndefined as unknown as ResponseWeeklyFrequencyType;
    }

    return right(new WeeklyFrequencyValueObject(props));
  }

  private static quantityPerWeekIsValidNumber(quantityPerWeek?: number): boolean {
    if (quantityPerWeek && typeof quantityPerWeek !== 'number') return false;
    if (quantityPerWeek! < 1) return false;

    return true;
  }

  private static validWeekDays(weekDays?: WeekDaysEnumType[]): Either<WeekDaysErrorsType, WeekDaysAcceptedType> {
    if (weekDays) {
      if (!this.isInstanceOfArray(weekDays)) return left(new InvalidArrayInstanceError());

      if (!this.valueIsCorrectWeekDays(weekDays))
        return left(new InvalidFieldsValuesError('Dia da semana', keysWeekDays));

      if (!this.valuesIsUnique(weekDays)) return left(new InvalidUniqueWeekdaysError());
    }

    return right(weekDays);
  }

  private static isInstanceOfArray(value: any[]): boolean {
    return Array.isArray(value);
  }

  private static valueIsCorrectWeekDays(array: WeekDaysEnumType[]): boolean {
    for (const element of array) {
      if (!keysWeekDays.includes(element)) return false;
    }

    return true;
  }

  private static valuesIsUnique(array: WeekDaysEnumType[]): boolean {
    return new Set(array).size === array.length;
  }
}
