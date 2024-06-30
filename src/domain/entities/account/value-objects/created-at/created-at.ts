import { ValueObject } from '@/shared/domain';
import { Either, right, left } from '@/shared/either';

export class CreatedAt extends ValueObject<Date> {
  private constructor(createdAt: Date) {
    super(createdAt);
    Object.freeze(this);
  }

  static create(createdAt: Date): Either<Error, CreatedAt> {
    if (!CreatedAt.validateFormat(createdAt)) return left(new Error('Deu ruim!'));

    return right(new CreatedAt(createdAt));
  }

  static validateFormat(verifiedAt: Date) {
    return Boolean(new Date(verifiedAt));
  }
}
