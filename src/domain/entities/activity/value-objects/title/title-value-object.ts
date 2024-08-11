import { InvalidFormatTitle } from '@/domain/entities/activity/errors';
import { FieldIsRequired } from '@/domain/shared/errors';
import { ValueObject } from '@/shared/domain';
import { Either, left, right } from '@/shared/either';

type TitleError = FieldIsRequired | InvalidFormatTitle;

export class Title extends ValueObject {
  private constructor(value: string) {
    super(value);
    Object.freeze(this);
  }

  static create(value: string): Either<TitleError, Title> {
    const valueTrim = value.trim();

    if (!this.hasTitle(valueTrim)) {
      return left(new FieldIsRequired('Título'));
    }

    if (!this.hasCorrectTitleFormat(valueTrim)) {
      return left(new InvalidFormatTitle());
    }

    return right(new Title(valueTrim));
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
