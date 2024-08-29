import type { CustomError } from '@/domain/entities/measure/errors/custon-error';
import type { MeasureEntityModel } from '@/domain/entities/measure/models';
import type { Either } from '@/shared/either';
import type { CreateRepositoryContract } from '../repository-contracts-usecase';

export type MeasureRepositoryDto = Omit<MeasureEntityModel, 'imageBase64'> & {
  imageUrl: string;
};

export interface FindMeasureByTypeAndCurrentMonth<T extends MeasureRepositoryDto> {
  findByTypeAndCurrentMonth: (type: string, date: Date) => Promise<Either<CustomError, T | null>>;
}

export interface MeasureRepositoryContractsUsecase
  extends FindMeasureByTypeAndCurrentMonth<MeasureRepositoryDto>,
    CreateRepositoryContract<MeasureRepositoryDto> {}
