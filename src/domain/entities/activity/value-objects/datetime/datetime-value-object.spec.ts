import { FieldIsRequired } from '@/domain/shared/errors';
import { Datetime } from './datetime-value-object';

const now = new Date();

describe('Datetime Value Object', () => {
  it('Should return error if received empty value', () => {
    const datetime = Datetime.create('' as any);
    expect(datetime.isLeft()).toBeTruthy();
    expect(datetime.isRight()).toBeFalsy();
    expect(datetime.value).toEqual(new FieldIsRequired('Datetime'));
  });

  it('Should correct datetime', () => {
    const datetime = Datetime.create(now);
    expect(datetime.value).toEqual({ props: now });
  });
});
