import { CustomerEntityProps, CustomerProps, ResponseCustomerEntityProps } from '@/domain/entities/customer/types';
import { Id } from '@/domain/shared/value-objects/id/id-value-object';
import { left, right } from '@/shared/either';
import { Email, Name } from './value-objects';

export class CustomerEntity {
  private constructor(private props: CustomerEntityProps) {
    Object.freeze(this);
  }

  get id(): string {
    return this.props.id.value;
  }

  get name(): string {
    return this.props.name.value;
  }

  get email(): string {
    return this.props.email.value;
  }

  static create({ id, name, email }: CustomerProps): ResponseCustomerEntityProps {
    const idOrError = Id.create(id);
    const nameOrError = Name.create(name);
    const emailOrError = Email.create(email);

    const results = [idOrError, nameOrError, emailOrError];

    for (const result of results) {
      if (result.isLeft()) {
        return left(result.value);
      }
    }

    return right(
      new CustomerEntity({
        id: idOrError.value as Id,
        name: nameOrError.value as Name,
        email: emailOrError.value as Email,
      }),
    );
  }
}
