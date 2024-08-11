import { DateIsInThePast, InvalidDate } from '@/domain/entities/activity/errors';
import { FieldIsRequired } from '@/domain/shared/errors';
import { Datetime } from './datetime-value-object';

const now = new Date();

describe('Datetime Value Object', () => {
  it('Should return error if received empty value', () => {
    const datetime = Datetime.create('' as any);
    expect(datetime.isLeft()).toBeTruthy();
    expect(datetime.isRight()).toBeFalsy();
    expect(datetime.value).toEqual(new FieldIsRequired('Data e hora'));
  });

  it('Should error if invalid date', () => {
    const datetime = Datetime.create(now.toString() as any);
    expect(datetime.isLeft()).toBeTruthy();
    expect(datetime.isRight()).toBeFalsy();
    expect(datetime.value).toEqual(new InvalidDate());
  });

  it('Should return error if the date is in the past', () => {
    const datetime = Datetime.create(now);
    expect(datetime.isLeft()).toBeTruthy();
    expect(datetime.isRight()).toBeFalsy();
    expect(datetime.value).toEqual(new DateIsInThePast());
  });

  it('Should correct datetime', () => {
    const futureDate = new Date(now);
    futureDate.setDate(now.getDate() + 10);
    const datetime = Datetime.create(futureDate);
    expect(datetime.value).toEqual({ props: futureDate });
  });
});
