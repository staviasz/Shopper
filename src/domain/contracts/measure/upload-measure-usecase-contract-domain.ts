import type { CustomError } from '@/domain/entities/measure/errors/custon-error';
import type { MeasureModel } from '@/domain/entities/measure/models/measure-model';
import type { Either } from '@/shared/either';

export type InputUploadMeasureUseCase = MeasureModel & {
  imageBase64: string;
};

export type UploadMeasureResultType = {
  imageUrl: string;
  measureValue: number;
  measureUuid: string;
};

export type OutputUploadMeasureUseCase = Either<CustomError, UploadMeasureResultType>;

export interface UploadMeasureUseCaseContractDomain {
  perform: (measure: InputUploadMeasureUseCase) => Promise<OutputUploadMeasureUseCase>;
}
