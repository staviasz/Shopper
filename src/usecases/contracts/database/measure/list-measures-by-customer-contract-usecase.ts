import type { FindByFieldListRepositoryContract } from '../repository-contracts-usecase';
import type { MeasureRepositoryDto } from './measure-repository-contract-usecase';

export interface ListMeasuresByCustomerRepositoryUsecaseContract
  extends FindByFieldListRepositoryContract<MeasureRepositoryDto> {}
