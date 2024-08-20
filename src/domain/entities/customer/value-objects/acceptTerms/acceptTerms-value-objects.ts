import { AcceptedTermsError } from '@/domain/entities/customer/errors';
import { ValueObject } from '@/domain/entities/value-object';
import { Either, left, right } from '@/shared/either';

export type AcceptTermsType = { acceptTerms: boolean };

export class AcceptTermsValueObject extends ValueObject<AcceptTermsType> {
  private constructor({ acceptTerms }) {
    super(acceptTerms);
  }

  static create(acceptTerms: boolean): Either<AcceptedTermsError[], AcceptTermsValueObject> {
    this.clearErrors();
    if (!acceptTerms) {
      this.addError(new AcceptedTermsError());
    }

    const errors = this.errors();
    if (errors) {
      return left(errors);
    }
    return right(new AcceptTermsValueObject({ acceptTerms }));
  }
}
