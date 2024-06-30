import { ValueObject } from '@/shared/domain';
import { Either, right, left } from '@/shared/either';
// import { formatDateStringToDateTime } from '@/utils';
// import { cleanDate } from '@/utils/clean-date/clean-date';

export class VerifiedAt extends ValueObject<Date> {
  private constructor(verifiedAt: Date) {
    super(verifiedAt);
    Object.freeze(this);
  }

  static create(verifiedAt: Date): Either<Error, VerifiedAt> {
    if (!VerifiedAt.validateFormat(verifiedAt)) return left(new Error('Deu ruim!'));

    // verifiedAt = verifiedAt.replace(/\s+/g, '');
    return right(new VerifiedAt(verifiedAt));
  }

  static validateFormat(verifiedAt: Date) {
    return Boolean(new Date(verifiedAt));
  }
}
