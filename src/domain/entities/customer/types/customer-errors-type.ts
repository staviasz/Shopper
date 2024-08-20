import { CustomerEntity } from '@/domain/entities/customer/customer-entity';
import { FormatedEntityArrayErrors } from '@/domain/shared/errors';
import { Either } from '@/shared/either';

export type ResponseCustomerEntityType = Either<FormatedEntityArrayErrors, CustomerEntity>;
