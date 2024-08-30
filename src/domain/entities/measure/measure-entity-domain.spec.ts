import { MeasureEntityDomain } from './measure-entity-domain';
import type { MeasureModel } from './models/measure-model';
import { MeasureEnumType } from './types/measure-enum-type';

const data: MeasureModel = {
  customerCode: '123',
  dateTime: new Date(),
  type: MeasureEnumType.WATER,
};

describe('MeasureEntityDomain Unit Test', () => {
  it('Should return error if no customer code', () => {
    const measure = MeasureEntityDomain.create({
      ...data,
      customerCode: '',
    });

    expect(measure.isRight()).toBeFalsy();
    expect(measure.isLeft()).toBeTruthy();
    expect(measure.value).toEqual({
      error_code: 'INVALID_DATA',
      error_description: 'O campo código do cliente é obrigatório',
    });
  });

  it('Should return error if no date time', () => {
    const measure = MeasureEntityDomain.create({
      ...data,
      dateTime: undefined as any,
    });

    expect(measure.isRight()).toBeFalsy();
    expect(measure.isLeft()).toBeTruthy();
    expect(measure.value).toEqual({
      error_code: 'INVALID_DATA',
      error_description: 'O campo data e hora é obrigatório',
    });
  });

  it('Should return error if no type or invalid', () => {
    const measure = MeasureEntityDomain.create({
      ...data,
      type: '' as any,
    });

    expect(measure.isRight()).toBeFalsy();
    expect(measure.isLeft()).toBeTruthy();
    expect(measure.value).toEqual({
      error_code: 'INVALID_DATA',
      error_description:
        'O campo tipo é obrigatório, O campo tipo deve ter um dos seguintes valores: WATER, GAS',
    });
    const measure2 = MeasureEntityDomain.create({
      ...data,
      type: 'teste' as any,
    });

    expect(measure2.isRight()).toBeFalsy();
    expect(measure2.isLeft()).toBeTruthy();
    expect(measure2.value).toEqual({
      error_code: 'INVALID_DATA',
      error_description: 'O campo tipo deve ter um dos seguintes valores: WATER, GAS',
    });
  });

  it('Should return all errors', () => {
    const measure = MeasureEntityDomain.create({
      customerCode: '',
      dateTime: undefined as any,
      type: '' as any,
    });

    expect(measure.isRight()).toBeFalsy();
    expect(measure.isLeft()).toBeTruthy();
    expect(measure.value).toEqual({
      error_code: 'INVALID_DATA',
      error_description:
        'O campo código do cliente é obrigatório, O campo data e hora é obrigatório, O campo tipo é obrigatório, O campo tipo deve ter um dos seguintes valores: WATER, GAS',
    });
  });

  it('Should return success', () => {
    const measure = MeasureEntityDomain.create(data);

    const { id, customerCode, dateTime, type, hasConfirmed } = measure.value as MeasureEntityDomain;

    expect(measure.isRight()).toBeTruthy();
    expect(id).toEqual(expect.any(String));
    expect(customerCode).toEqual(data.customerCode);
    expect(dateTime).toEqual(data.dateTime);
    expect(type).toEqual(data.type);
    expect(hasConfirmed).toBeFalsy();
  });

  it('Should return error in changeMeasureValue', () => {
    const measure = MeasureEntityDomain.create(data);
    const value = -1;
    const measureValue = (measure.value as MeasureEntityDomain).changeMeasureValue(value);

    expect(measureValue.isLeft()).toBeTruthy();
    expect(measureValue.value).toEqual({
      error_code: 'INVALID_DATA',
      error_description: 'O campo valor deve ser um número positivo',
    });
  });

  it('Should return success in changeMeasureValue', () => {
    const measure = MeasureEntityDomain.create(data);
    const insertValue = 10;
    const measureValue = (measure.value as MeasureEntityDomain).changeMeasureValue(insertValue);
    const { id, customerCode, dateTime, type, value } = measureValue.value as MeasureEntityDomain;

    expect(measureValue.isRight()).toBeTruthy();
    expect(id).toEqual(expect.any(String));
    expect(customerCode).toEqual(data.customerCode);
    expect(dateTime).toEqual(data.dateTime);
    expect(type).toEqual(data.type);
    expect(value).toEqual(value);
  });

  it('Should return error in changeConfirmation', () => {
    const measure = MeasureEntityDomain.create(data);
    const value = -1;
    const measureValue = (measure.value as MeasureEntityDomain).changeConfirmation(value);

    expect(measureValue.isLeft()).toBeTruthy();
    expect(measureValue.value).toEqual({
      error_code: 'INVALID_DATA',
      error_description: 'O campo valor deve ser um número positivo',
    });
  });

  it('Should return success in changeConfirmation', () => {
    const measure = MeasureEntityDomain.create(data);
    const insertValue = 10;
    const measureValue = (measure.value as MeasureEntityDomain).changeConfirmation(insertValue);
    const { id, customerCode, dateTime, type, value, hasConfirmed } =
      measureValue.value as MeasureEntityDomain;

    expect(measureValue.isRight()).toBeTruthy();
    expect(id).toEqual(expect.any(String));
    expect(customerCode).toEqual(data.customerCode);
    expect(dateTime).toEqual(data.dateTime);
    expect(type).toEqual(data.type);
    expect(value).toEqual(value);
    expect(hasConfirmed).toBeTruthy();
  });
});
