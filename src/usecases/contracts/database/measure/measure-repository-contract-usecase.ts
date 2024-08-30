import type { MeasureEntityModel } from '@/domain/entities/measure/models';
import type {
  CreateRepositoryContract,
  FindByFieldListRepositoryContract,
  FindByFieldRepositoryContract,
  FindMeasureByTypeAndCurrentMonth,
  UpdateRepositoryContract,
} from '../repository-contracts-usecase';

export type MeasureRepositoryDto = Omit<MeasureEntityModel, 'imageBase64'> & {
  imageUrl: string;
};

export interface MeasureRepositoryContractsUsecase
  extends FindMeasureByTypeAndCurrentMonth<MeasureRepositoryDto>,
    CreateRepositoryContract<MeasureRepositoryDto>,
    FindByFieldRepositoryContract<MeasureRepositoryDto>,
    UpdateRepositoryContract<MeasureRepositoryDto>,
    FindByFieldListRepositoryContract<MeasureRepositoryDto> {}
