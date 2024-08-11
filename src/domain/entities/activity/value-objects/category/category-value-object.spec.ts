import { Categories } from '@/domain/entities/activity/types';
import { FieldIsRequired, InvalidFieldsValues } from '@/domain/shared/errors';
import { Category } from './category-value-object';

const KeysCategories = Object.values(Categories);

describe('Category Value Object', () => {
  it('Should return error if received empty value', () => {
    const activity = Category.create('' as any);
    expect(activity.isLeft()).toBeTruthy();
    expect(activity.isRight()).toBeFalsy();
    expect(activity.value).toEqual(new FieldIsRequired('Categoria'));
  });

  it('Should return error if received invalid value', () => {
    const activity = Category.create('test' as any);
    expect(activity.isLeft()).toBeTruthy();
    expect(activity.isRight()).toBeFalsy();
    expect(activity.value).toEqual(new InvalidFieldsValues('Categoria', KeysCategories));
  });

  it('Should correct category ', () => {
    const activity = Category.create(Categories.career);
    expect(activity.isLeft()).toBeFalsy();
    expect(activity.isRight()).toBeTruthy();
    expect(activity.value).toEqual({ props: Categories.career });
  });
});
