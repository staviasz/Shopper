import { ResponseCustomerEntityType } from '@/domain/entities/customer/types';
import { Entity } from '@/domain/entities/entity';
import { FormatedEntityArrayErrors } from '@/domain/shared/errors/';
import { left, right } from '@/shared/either';
import { CustomerEntityModel, CustomerModel } from './models';
import { AcceptTermsType, AcceptTermsValueObject, EmailValueObject, NameValueObject } from './value-objects';

export class CustomerEntity extends Entity<CustomerEntityModel> {
  private constructor(protected props: CustomerEntityModel) {
    super(props);
    Object.freeze(this);
  }

  get name(): string {
    return this.props.name.value;
  }

  get email(): string {
    return this.props.email.value;
  }

  get acceptedTerms(): AcceptTermsType {
    return this.props.acceptedTerms.value;
  }

  static create(data: CustomerModel): ResponseCustomerEntityType {
    const result = this.validate(data) as CustomerEntityModel;

    if (!result) {
      const formattedErrors = new FormatedEntityArrayErrors(this.formatErrors());
      return left(formattedErrors);
    }

    return right(
      new CustomerEntity({
        id: result.id as string,
        name: result.name as NameValueObject,
        email: result.email as EmailValueObject,
        acceptedTerms: result.acceptedTerms as AcceptTermsValueObject,
      }),
    );
  }

  static validate({ id, name, email, acceptedTerms }: CustomerModel): void | CustomerEntityModel {
    this.clearErrors();

    const idOrError = this.validateId(id);
    const nameOrError = NameValueObject.create(name);
    const emailOrError = EmailValueObject.create(email);
    const acceptedTermsOrError = AcceptTermsValueObject.create(acceptedTerms);

    const results = [idOrError, nameOrError, emailOrError, acceptedTermsOrError];

    for (const result of results) {
      if (result.isLeft()) {
        this.addError(result.value);
      }
    }

    if (this.errors()) return;

    return {
      id: idOrError.value as string,
      name: nameOrError.value as NameValueObject,
      email: emailOrError.value as EmailValueObject,
      acceptedTerms: acceptedTermsOrError.value as AcceptTermsValueObject,
    };
  }
}
