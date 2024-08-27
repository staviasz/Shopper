import { MeasureEntityDomain } from './measure-entity-domain';
import type { MeasureModel } from './models/measure-model';
import { MeasureEnumType } from './types/measure-enum-type';

const data: MeasureModel = {
  customerCode: '123',
  imageBase64:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/pmPswAAAABJRU5ErkJggg==',
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
      error_code: 'FIELD_IS_REQUIRED',
      error_description: 'O campo código do cliente é obrigatório',
    });
  });

  it('Should return errors if no image base64 or empty', () => {
    const measure = MeasureEntityDomain.create({
      ...data,
      imageBase64: 'imagem base64',
    });

    expect(measure.isRight()).toBeFalsy();
    expect(measure.isLeft()).toBeTruthy();
    expect(measure.value).toEqual({
      error_code: 'INVALID_FIELD',
      error_description: 'O campo imagem base64 está inválido',
    });

    const measure2 = MeasureEntityDomain.create({
      ...data,
      imageBase64: undefined as any,
    });

    expect(measure2.isRight()).toBeFalsy();
    expect(measure2.isLeft()).toBeTruthy();
    expect(measure2.value).toEqual([
      { error_code: 'FIELD_IS_REQUIRED', error_description: 'O campo imagem base64 é obrigatório' },
      { error_code: 'INVALID_FIELD', error_description: 'O campo imagem base64 está inválido' },
    ]);
  });

  it('Should return error if no date time', () => {
    const measure = MeasureEntityDomain.create({
      ...data,
      dateTime: undefined as any,
    });

    expect(measure.isRight()).toBeFalsy();
    expect(measure.isLeft()).toBeTruthy();
    expect(measure.value).toEqual({
      error_code: 'FIELD_IS_REQUIRED',
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
    expect(measure.value).toEqual([
      { error_code: 'FIELD_IS_REQUIRED', error_description: 'O campo tipo é obrigatório' },
      {
        error_code: 'INVALID_FIELD_VALUES',
        error_description: 'O campo tipo deve ter um dos seguintes valores: WATER, GAS',
      },
    ]);

    const measure2 = MeasureEntityDomain.create({
      ...data,
      type: 'teste' as any,
    });

    expect(measure2.isRight()).toBeFalsy();
    expect(measure2.isLeft()).toBeTruthy();
    expect(measure2.value).toEqual({
      error_code: 'INVALID_FIELD_VALUES',
      error_description: 'O campo tipo deve ter um dos seguintes valores: WATER, GAS',
    });
  });

  it('Should return all errors', () => {
    const measure = MeasureEntityDomain.create({
      customerCode: '',
      imageBase64: 'imagem base64',
      dateTime: undefined as any,
      type: '' as any,
    });

    expect(measure.isRight()).toBeFalsy();
    expect(measure.isLeft()).toBeTruthy();
    expect(measure.value).toEqual([
      {
        error_code: 'FIELD_IS_REQUIRED',
        error_description: 'O campo código do cliente é obrigatório',
      },
      {
        error_code: 'INVALID_FIELD',
        error_description: 'O campo imagem base64 está inválido',
      },
      {
        error_code: 'FIELD_IS_REQUIRED',
        error_description: 'O campo data e hora é obrigatório',
      },
      {
        error_code: 'FIELD_IS_REQUIRED',
        error_description: 'O campo tipo é obrigatório',
      },
      {
        error_code: 'INVALID_FIELD_VALUES',
        error_description: 'O campo tipo deve ter um dos seguintes valores: WATER, GAS',
      },
    ]);
  });

  it('Should return success', () => {
    const measure = MeasureEntityDomain.create(data);

    const { id, customerCode, imageBase64, dateTime, type } = measure.value as MeasureEntityDomain;

    expect(measure.isRight()).toBeTruthy();
    expect(id).toEqual(expect.any(String));
    expect(customerCode).toEqual(data.customerCode);
    expect(imageBase64).toEqual(data.imageBase64);
    expect(dateTime).toEqual(data.dateTime);
    expect(type).toEqual(data.type);
  });
});
