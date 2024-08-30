import type {
  InputListMeasuresByCustomerUseCase,
  ListMeasureEntityModelWithoutCustomerCode,
  ListMeasuresByCustomerUseCaseContractDomain,
  OutputListMeasuresByCustomerUseCase,
} from '@/domain/contracts/measure/list-measure-by-customer-usecase-contract-domai';
import { CustomError } from '@/domain/entities/measure/errors/custon-error';
import { left, right } from '@/shared/either';
import type { MeasureRepositoryDto } from '@/usecases/contracts/database';
import type { ListMeasuresByCustomerRepositoryUsecaseContract } from '@/usecases/contracts/database/measure/list-measures-by-customer-contract-usecase';

export class ListMeasuresByCustomerUsecase implements ListMeasuresByCustomerUseCaseContractDomain {
  constructor(private repository: ListMeasuresByCustomerRepositoryUsecaseContract) {}
  async perform(
    data: InputListMeasuresByCustomerUseCase,
  ): Promise<OutputListMeasuresByCustomerUseCase> {
    const measures = await this.repository.findByFieldList(
      'customerCode',
      data.customerCode,
      data.type && { field: 'type', value: data.type },
    );

    if (!measures.value) {
      return left(
        new CustomError({
          error_code: 'MEASURES_NOT_FOUND',
          error_description: 'Nenhuma leitura não encontrada',
        }),
      );
    }

    const FormatedMeasures: ListMeasureEntityModelWithoutCustomerCode[] = (
      measures.value as MeasureRepositoryDto[]
    ).map(measure => {
      return {
        id: measure.id,
        type: measure.type,
        value: measure.value,
        dateTime: measure.dateTime,
        imageUrl: measure.imageUrl,
        hasConfirmed: measure.hasConfirmed,
      };
    });

    return right({ customerCode: data.customerCode, measures: FormatedMeasures });
  }
}
