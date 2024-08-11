import { CustomerEntity } from '@/domain/entities/customer/customer-entity';
import { InvalidName } from '@/domain/entities/customer/errors';
import { FieldIsRequired, InvalidField } from '@/domain/shared/errors';
import { Either } from '@/shared/either';

export type ErrorsCustomerProps = FieldIsRequired | InvalidField | InvalidName;

export type ResponseCustomerEntityProps = Either<ErrorsCustomerProps, CustomerEntity>;
