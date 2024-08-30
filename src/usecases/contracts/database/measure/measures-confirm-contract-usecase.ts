import type {
  FindByFieldRepositoryContract,
  UpdateRepositoryContract,
} from '../repository-contracts-usecase';
import type { MeasureRepositoryDto } from './measure-repository-contract-usecase';

export interface MeasuresConfirmRepositoryUsecaseContract
  extends FindByFieldRepositoryContract<MeasureRepositoryDto>,
    UpdateRepositoryContract<MeasureRepositoryDto> {}
