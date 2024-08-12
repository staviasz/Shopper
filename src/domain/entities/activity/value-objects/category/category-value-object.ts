import { CategoriesEnumType } from '@/domain/entities/activity/types';
import { FieldIsRequiredError, InvalidFieldsValuesError } from '@/domain/shared/errors';
import { ValueObject } from '@/shared/domain';
import { Either, left, right } from '@/shared/either';

const KeysCategories = Object.values(CategoriesEnumType);

type CategoryError = FieldIsRequiredError | InvalidFieldsValuesError;

export class CategoryValueObject extends ValueObject {
  private constructor(value: string) {
    super(value);
    Object.freeze(this);
  }

  static create(value: CategoriesEnumType): Either<CategoryError, CategoryValueObject> {
    if (!this.hasValue(value)) {
      return left(new FieldIsRequiredError('Categoria'));
    }

    if (!this.isValidValue(value)) {
      return left(new InvalidFieldsValuesError('Categoria', KeysCategories));
    }
    return right(new CategoryValueObject(value));
  }

  private static hasValue(value: string): boolean {
    return !!value;
  }

  private static isValidValue(value: string): value is CategoriesEnumType {
    return KeysCategories.includes(value as CategoriesEnumType);
  }
}
