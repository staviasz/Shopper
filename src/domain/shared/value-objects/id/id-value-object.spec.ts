import { FieldIsRequiredError, InvalidFieldError } from '@/domain/shared/errors';
import { Id } from './id-value-object';

describe('IdValueObject', () => {
  it('should return error when id is empty', () => {
    const id = Id.create('');

    expect(id.isLeft()).toBeTruthy();
    expect(id.isRight()).toBeFalsy();
    expect(id.value).toBeInstanceOf(FieldIsRequiredError);
  });

  it('should return error when id is invalid', () => {
    const id = Id.create('123');

    expect(id.isLeft()).toBeTruthy();
    expect(id.isRight()).toBeFalsy();
    expect(id.value).toBeInstanceOf(InvalidFieldError);
  });

  it('should return id when id is valid', () => {
    const idData = '550e8400-e29b-41d4-a716-446655440000';
    const id = Id.create(idData);
    expect(id.isRight()).toBeTruthy();
    expect(id.isLeft()).toBeFalsy();
    expect(id.value).toEqual({ props: idData });
  });
});
