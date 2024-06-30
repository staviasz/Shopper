import { ValueObject } from '@/shared/domain';
import { Either, right, left } from '@/shared/either';

export class UpdatedAt extends ValueObject<Date> {
  private constructor(updatedAt: Date) {
    super(updatedAt);
    Object.freeze(this);
  }

  static create(updatedAt: Date): Either<Error, UpdatedAt> {
    if (!UpdatedAt.validateFormat(updatedAt)) return left(new Error('Deu ruim!'));

    return right(new UpdatedAt(updatedAt));
  }

  static validateFormat(verifiedAt: Date) {
    return Boolean(new Date(verifiedAt));
  }
}
