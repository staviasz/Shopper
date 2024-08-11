import { Categories } from '@/domain/entities/activity/types';
import { FieldIsRequired, InvalidFieldsValues } from '@/domain/shared/errors';
import { ValueObject } from '@/shared/domain';
import { Either, left, right } from '@/shared/either';

const KeysCategories = Object.values(Categories);

type CategoryError = FieldIsRequired;

export class Category extends ValueObject {
  private constructor(value: string) {
    super(value);
    Object.freeze(this);
  }

  static create(value: Categories): Either<CategoryError, Category> {
    if (!this.hasValue(value)) {
      return left(new FieldIsRequired('Categoria'));
    }

    if (!this.isValidValue(value)) {
      return left(new InvalidFieldsValues('Categoria', KeysCategories));
    }
    return right(new Category(value));
  }

  private static hasValue(value: string): boolean {
    return !!value;
  }

  private static isValidValue(value: string): value is Categories {
    return KeysCategories.includes(value as Categories);
  }
}
