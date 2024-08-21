import { CategoriesEnumType } from '@/domain/entities/activity/types';
import { FieldIsRequiredError, InvalidFieldsValuesError } from '@/domain/shared/errors';
import { CategoryValueObject } from './category-value-object';

const KeysCategories = Object.values(CategoriesEnumType);

describe('Category Value Object', () => {
  it('Should return error if received empty value', () => {
    const activity = CategoryValueObject.create('' as any);
    expect(activity.isLeft()).toBeTruthy();
    expect(activity.isRight()).toBeFalsy();
    expect(activity.value).toEqual([
      new FieldIsRequiredError('Categoria'),
      new InvalidFieldsValuesError('Categoria', KeysCategories),
    ]);
  });

  it('Should return error if received invalid value', () => {
    const activity = CategoryValueObject.create('test' as any);
    expect(activity.isLeft()).toBeTruthy();
    expect(activity.isRight()).toBeFalsy();
    expect(activity.value).toEqual([new InvalidFieldsValuesError('Categoria', KeysCategories)]);
  });

  it('Should correct category ', () => {
    const activity = CategoryValueObject.create(CategoriesEnumType.career);
    expect(activity.isLeft()).toBeFalsy();
    expect(activity.isRight()).toBeTruthy();
    expect(activity.value).toEqual({ props: CategoriesEnumType.career });
  });
});
