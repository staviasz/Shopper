import { CustomerEntity } from '@/domain/entities/customer/customer-entity';
import { InvalidNameError } from '@/domain/entities/customer/errors';
import { FieldIsRequiredError, InvalidFieldError } from '@/domain/shared/errors';
import { Either } from '@/shared/either';

export type ErrorsCustomerType = FieldIsRequiredError | InvalidFieldError | InvalidNameError;

export type ResponseCustomerEntityType = Either<ErrorsCustomerType, CustomerEntity>;
