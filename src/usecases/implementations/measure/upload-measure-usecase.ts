import type {
  InputUploadMeasureUseCase,
  OutputUploadMeasureUseCase,
  UploadMeasureUseCaseContractDomain,
} from '@/domain/contracts/measure/upload-measure-usecase-contract-domain';
import type { ObjectError } from '@/domain/entities/measure/errors/custon-error';
import { CustomError } from '@/domain/entities/measure/errors/custon-error';
import { MeasureEntityDomain } from '@/domain/entities/measure/measure-entity-domain';
import { left, right } from '@/shared/either';
import type { MeasureRepositoryContractsUsecase } from '@/usecases/contracts/database';
import type { ExternalRequestMeasureValue } from '@/usecases/contracts/external-requests';

export class UploadMeasureUsecase implements UploadMeasureUseCaseContractDomain {
  constructor(
    private repository: MeasureRepositoryContractsUsecase,
    private externalRequest: ExternalRequestMeasureValue,
  ) {}
  async perform(measure: InputUploadMeasureUseCase): Promise<OutputUploadMeasureUseCase> {
    const measureEntity = MeasureEntityDomain.create(measure);

    if (measureEntity.isLeft()) {
      return this.formatedError(measureEntity.value);
    }

    const { type, dateTime, customerCode, id } = measureEntity.value;

    const existMeasure = await this.repository.findByTypeAndCurrentMonth(type, dateTime);
    if (existMeasure.isLeft() || existMeasure.value) {
      return left(
        new CustomError({
          error_code: 'DOUBLE_REPORT',
          error_description: 'Leitura do mês já realizada',
        }),
      );
    }

    const { measureValue, imageUrl } = await this.formatedExternalResponse(measure.imageBase64);

    const addValue = measureEntity.value.changeMeasureValue(measureValue);
    if (addValue.isLeft()) {
      return this.formatedError(addValue.value);
    }

    await this.repository.create({
      id,
      customerCode,
      dateTime,
      type,
      imageUrl,
      value: measureValue,
    });

    return right({
      imageUrl,
      measureValue,
      measureUuid: id,
    });
  }

  async formatedExternalResponse(imageBase64: string) {
    const { textResult, imageUrl } = await this.externalRequest.execute({
      imageBase64,
      text: 'which number is registered on the meter, answer only the number',
    });

    const textResultOnlyDigits = textResult.replace(/D/g, '');

    const measureValue = parseInt(textResultOnlyDigits);
    return { imageUrl, measureValue: isNaN(measureValue) ? 0 : measureValue };
  }

  formatedError(value: ObjectError | ObjectError[]): OutputUploadMeasureUseCase {
    return Array.isArray(value)
      ? left(value.map(error => new CustomError(error)))
      : left(new CustomError(value));
  }
}
