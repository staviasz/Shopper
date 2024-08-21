import { CustomerEntity } from '@/domain/entities/customer/customer-entity';
import {
  CreateRepositoryContract,
  FindByFieldRepositoryContract,
} from '@/usecases/contracts/database/repository-contracts-usecase';

export interface CustomerRepositoryContractsUsecase
  extends FindByFieldRepositoryContract<CustomerEntity>,
    CreateRepositoryContract<CustomerEntity> {}
