import type {
  CreateRepositoryContract,
  FindMeasureByTypeAndCurrentMonth,
} from '../repository-contracts-usecase';
import type { MeasureRepositoryDto } from './measure-repository-contract-usecase';

export interface MeasuresUploadRepositoryUsecaseContract
  extends CreateRepositoryContract<MeasureRepositoryDto>,
    FindMeasureByTypeAndCurrentMonth<MeasureRepositoryDto> {}
