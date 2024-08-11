import { WeekDays, WeeklyFrequency as WeeklyFrequencyType } from '@/domain/entities/activity/types';
import { InvalidArrayInstance, InvalidFieldPositiveNumber, InvalidFieldsValues } from '@/domain/shared/errors';
import { ValueObject } from '@/shared/domain';
import { Either, left, right } from '@/shared/either';
import { InvalidUniqueWeekdays } from '../../errors';
import { Datetime } from '../datetime/datetime-value-object';

type WeeklyFrequencyErrors = InvalidFieldPositiveNumber | WeekDaysErrors;
type WeekDaysAccepted = WeekDays[] | void;
type WeekDaysErrors = InvalidArrayInstance;

const keysWeekDays = Object.values(WeekDays);

export class WeeklyFrequency extends ValueObject<WeeklyFrequencyType> {
  private constructor(props: WeeklyFrequencyType) {
    super(props);
    Object.freeze(this);
  }

  static create(props: WeeklyFrequencyType): Either<WeeklyFrequencyErrors, WeeklyFrequency> {
    if (!this.quantityPerWeekIsValidNumber(props.quantityPerWeek)) {
      return left(new InvalidFieldPositiveNumber('Quantidade semanal'));
    }

    const validateWeekDays = this.validWeekDays(props.weekDays);
    if (validateWeekDays.isLeft()) {
      return validateWeekDays as unknown as Either<WeeklyFrequencyErrors, WeeklyFrequency>;
    }

    const finallyDateOrUndefined = props.finallyDate && Datetime.create(props.finallyDate);
    if (finallyDateOrUndefined && finallyDateOrUndefined.isLeft()) {
      return finallyDateOrUndefined as unknown as Either<WeeklyFrequencyErrors, WeeklyFrequency>;
    }

    return right(new WeeklyFrequency(props));
  }

  private static quantityPerWeekIsValidNumber(quantityPerWeek?: number): boolean {
    if (quantityPerWeek && typeof quantityPerWeek !== 'number') return false;
    if (quantityPerWeek! < 1) return false;

    return true;
  }

  private static validWeekDays(weekDays?: WeekDays[]): Either<WeekDaysErrors, WeekDaysAccepted> {
    if (weekDays) {
      if (!this.isInstanceOfArray(weekDays)) return left(new InvalidArrayInstance());

      if (!this.valueIsCorrectWeekDays(weekDays)) return left(new InvalidFieldsValues('Dia da semana', keysWeekDays));

      if (!this.valuesIsUnique(weekDays)) return left(new InvalidUniqueWeekdays());
    }

    return right(weekDays);
  }

  private static isInstanceOfArray(value: any[]): boolean {
    return Array.isArray(value);
  }

  private static valueIsCorrectWeekDays(array: WeekDays[]): boolean {
    for (const element of array) {
      if (!keysWeekDays.includes(element)) return false;
    }

    return true;
  }

  private static valuesIsUnique(array: WeekDays[]): boolean {
    return new Set(array).size === array.length;
  }
}
