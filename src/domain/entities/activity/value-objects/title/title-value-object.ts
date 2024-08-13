import { InvalidFormatTitleError } from '@/domain/entities/activity/errors';
import { ValueObject } from '@/shared/domain';
import { Either, left, right } from '@/shared/either';
import { FieldIsRequiredError } from './../../../../shared/errors/field-is-required-error';

type TitleError = FieldIsRequiredError | InvalidFormatTitleError;

export class TitleValueObject extends ValueObject {
  private constructor(value: string) {
    super(value);
    Object.freeze(this);
  }

  static create(value: string): Either<TitleError, TitleValueObject> {
    const valueTrim = value.trim();

    if (!this.hasTitle(valueTrim)) {
      return left(new FieldIsRequiredError('Título'));
    }

    if (!this.hasCorrectTitleFormat(valueTrim)) {
      return left(new InvalidFormatTitleError());
    }

    return right(new TitleValueObject(valueTrim));
  }

  private static hasTitle(title: string): boolean {
    return !!title;
  }

  private static hasCorrectTitleFormat(title: string): boolean {
    if (title.length < 3 || title.length > 50) {
      return false;
    }

    return true;
  }
}
