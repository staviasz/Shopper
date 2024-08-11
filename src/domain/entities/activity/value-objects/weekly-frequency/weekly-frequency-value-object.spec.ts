import { DateIsInThePast, InvalidDate, InvalidUniqueWeekdays } from '@/domain/entities/activity/errors';
import { WeekDays, WeeklyFrequency as WeeklyFrequencyType } from '@/domain/entities/activity/types';
import { InvalidArrayInstance, InvalidFieldPositiveNumber, InvalidFieldsValues } from '@/domain/shared/errors';
import { WeeklyFrequency } from './weekly-frequency-value-object';

const now = new Date();
const futureDate = new Date(now);
futureDate.setDate(now.getDate() + 10);

const weeklyFrequencyData: WeeklyFrequencyType = {
  quantityPerWeek: 2,
  weekDays: [],
  finallyDate: futureDate,
};

const keysWeekDays = Object.values(WeekDays);

describe('Weekly Frequency Value Object', () => {
  it('Should return error if quantity per week received a value different from number', () => {
    const weeklyFrequency = WeeklyFrequency.create({ ...weeklyFrequencyData, quantityPerWeek: '2' as any });
    expect(weeklyFrequency.isLeft()).toBeTruthy();
    expect(weeklyFrequency.isRight()).toBeFalsy();
    expect(weeklyFrequency.value).toEqual(new InvalidFieldPositiveNumber('Quantidade semanal'));
  });

  it('Should return error if quantity per week is less than 1', () => {
    const weeklyFrequency = WeeklyFrequency.create({ ...weeklyFrequencyData, quantityPerWeek: 0 });
    expect(weeklyFrequency.isLeft()).toBeTruthy();
    expect(weeklyFrequency.isRight()).toBeFalsy();
    expect(weeklyFrequency.value).toEqual(new InvalidFieldPositiveNumber('Quantidade semanal'));
  });

  it('Should correct weekly frequency without quantity per week', () => {
    const { weekDays, finallyDate } = weeklyFrequencyData;

    const weeklyFrequency = WeeklyFrequency.create({ weekDays, finallyDate });
    expect(weeklyFrequency.isLeft()).toBeFalsy();
    expect(weeklyFrequency.isRight()).toBeTruthy();
    expect(weeklyFrequency.value).toEqual({ props: { weekDays, finallyDate } });
  });

  it("Should return error if week days isn't an array", () => {
    const weeklyFrequency = WeeklyFrequency.create({ ...weeklyFrequencyData, weekDays: 'test' as any });
    expect(weeklyFrequency.isLeft()).toBeTruthy();
    expect(weeklyFrequency.isRight()).toBeFalsy();
    expect(weeklyFrequency.value).toEqual(new InvalidArrayInstance());
  });

  it('Should return error if week days is not a valid week day', () => {
    const weeklyFrequency = WeeklyFrequency.create({ ...weeklyFrequencyData, weekDays: ['test'] as any });
    expect(weeklyFrequency.isLeft()).toBeTruthy();
    expect(weeklyFrequency.isRight()).toBeFalsy();
    expect(weeklyFrequency.value).toEqual(new InvalidFieldsValues('Dia da semana', keysWeekDays));
  });

  it("should return error if values in weekdays isn't unique", () => {
    const weeklyFrequency = WeeklyFrequency.create({
      ...weeklyFrequencyData,
      weekDays: [WeekDays.monday, WeekDays.monday],
    });
    expect(weeklyFrequency.isLeft()).toBeTruthy();
    expect(weeklyFrequency.isRight()).toBeFalsy();
    expect(weeklyFrequency.value).toEqual(new InvalidUniqueWeekdays());
  });

  it('Should correct weekly frequency without week days', () => {
    const { quantityPerWeek, finallyDate } = weeklyFrequencyData;
    const weeklyFrequency = WeeklyFrequency.create({ quantityPerWeek, finallyDate });
    expect(weeklyFrequency.isLeft()).toBeFalsy();
    expect(weeklyFrequency.isRight()).toBeTruthy();
    expect(weeklyFrequency.value).toEqual({ props: { quantityPerWeek, finallyDate } });
  });

  it('Should error if finally date is not a valid date', () => {
    const datetime = WeeklyFrequency.create({ ...weeklyFrequencyData, finallyDate: 2 as any });
    expect(datetime.isLeft()).toBeTruthy();
    expect(datetime.isRight()).toBeFalsy();
    expect(datetime.value).toEqual(new InvalidDate());
  });

  it('Should return error if the finally date is in the past', () => {
    const datetime = WeeklyFrequency.create({ ...weeklyFrequencyData, finallyDate: now });
    expect(datetime.isLeft()).toBeTruthy();
    expect(datetime.isRight()).toBeFalsy();
    expect(datetime.value).toEqual(new DateIsInThePast());
  });

  it('Should correct weekly frequency without finally date', () => {
    const { quantityPerWeek, weekDays } = weeklyFrequencyData;
    const weeklyFrequency = WeeklyFrequency.create({ quantityPerWeek, weekDays });
    expect(weeklyFrequency.isLeft()).toBeFalsy();
    expect(weeklyFrequency.isRight()).toBeTruthy();
    expect(weeklyFrequency.value).toEqual({ props: { quantityPerWeek, weekDays } });
  });

  it('Should return correct weekly frequency', () => {
    const weeklyFrequency = WeeklyFrequency.create(weeklyFrequencyData);
    expect(weeklyFrequency.isLeft()).toBeFalsy();
    expect(weeklyFrequency.isRight()).toBeTruthy();
    expect(weeklyFrequency.value).toEqual({ props: weeklyFrequencyData });
  });
});
