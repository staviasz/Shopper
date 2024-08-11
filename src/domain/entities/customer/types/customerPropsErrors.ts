import { InvalidName } from '@/domain/entities/customer/errors';
import { FieldIsRequired, InvalidField } from '@/domain/shared/errors';
import { Either } from '@/shared/either';
import { CustomerEntity } from '../customer-entity';

export type ErrorsCustomerProps = FieldIsRequired | InvalidField | InvalidName;

export type ResponseCustomerEntityProps = Either<ErrorsCustomerProps, CustomerEntity>;
