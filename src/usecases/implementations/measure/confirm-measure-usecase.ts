import type {
  ConfirmMeasureUseCaseContractDomain,
  InputConfirmMeasureUseCase,
  OutputConfirmMeasureUseCase,
} from '@/domain/contracts/measure/confirm-measure-usecase-contract-domai';
import type { ObjectError } from '@/domain/entities/measure/errors/custon-error';
import { CustomError } from '@/domain/entities/measure/errors/custon-error';
import { MeasureEntityDomain } from '@/domain/entities/measure/measure-entity-domain';
import { left, right } from '@/shared/either';
import type { MeasureRepositoryContractsUsecase } from '@/usecases/contracts/database';

export class ConfirmMeasureUsecase implements ConfirmMeasureUseCaseContractDomain {
  constructor(private repository: MeasureRepositoryContractsUsecase) {}
  async perform(data: InputConfirmMeasureUseCase): Promise<OutputConfirmMeasureUseCase> {
    const { id, value } = data;

    const measure = await this.repository.findByField('id', id);
    if (measure.isLeft() || !measure.value) {
      return left(
        new CustomError({
          error_code: 'MEASURE_NOT_FOUND',
          error_description: 'Leitura do mês não realizada',
        }),
      );
    }

    const hasConfirmed = measure.value.hasConfirmed;
    if (hasConfirmed) {
      return left(
        new CustomError({
          error_code: 'CONFIRMATION_DUPLICATE',
          error_description: 'Leitura do mês já realizada',
        }),
      );
    }

    const mesureEntity = MeasureEntityDomain.create(measure.value);

    const confirmatiom = (mesureEntity.value as MeasureEntityDomain).changeConfirmation(value);
    if (confirmatiom.isLeft()) {
      return this.formatedError(confirmatiom.value);
    }

    await this.repository.update({ value, id, hasConfirmed: true });
    return right({ success: true });
  }

  formatedError(value: ObjectError | ObjectError[]): OutputConfirmMeasureUseCase {
    return Array.isArray(value)
      ? left(value.map(error => new CustomError(error)))
      : left(new CustomError(value));
  }
}
