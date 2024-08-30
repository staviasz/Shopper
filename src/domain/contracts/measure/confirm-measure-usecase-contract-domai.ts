import type { CustomError } from '@/domain/entities/measure/errors/custon-error';
import type { Either } from '@/shared/either';

export type InputConfirmMeasureUseCase = {
  id: string;
  value: number;
};

export type ConfirmedOutputType = { success: boolean };
export type OutputConfirmMeasureUseCase = Either<CustomError, ConfirmedOutputType>;

export interface ConfirmMeasureUseCaseContractDomain {
  perform: (data: InputConfirmMeasureUseCase) => Promise<OutputConfirmMeasureUseCase>;
}
