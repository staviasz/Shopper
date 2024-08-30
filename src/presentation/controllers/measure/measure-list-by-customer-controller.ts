import type {
  ListMeasuresByCustomerUseCaseContractDomain,
  OutputListMeasuresByCustomerUseCase,
} from '@/domain/contracts/measure/list-measure-by-customer-usecase-contract-domai';
import { MeasureEnumType } from '@/domain/entities/measure/types/measure-enum-type';
import type { ControllerContractPresentation } from '@/presentation/contracts';
import { badRequest, notFound, ok } from '@/presentation/helpers/http-helpers';
import type { ControllerRequestType, ControllerResponseType } from '@/presentation/types';

export class MeasureListByCustomerController implements ControllerContractPresentation {
  constructor(private usecase: ListMeasuresByCustomerUseCaseContractDomain) {}
  async handle(request: ControllerRequestType): Promise<ControllerResponseType> {
    const data = this.formatedDataRequest(request);

    if (!data.customerCode || typeof data.customerCode !== 'string') {
      return badRequest({
        error_code: 'INVALID_DATA',
        error_description: 'O campo de cliente é obrigatório e deve ser uma string',
      });
    }

    const types = Object.values(MeasureEnumType);
    if (data.type && !types.includes(data.type.toString().toUpperCase())) {
      return badRequest({
        error_code: 'INVALID_TYPE',
        error_description: 'Tipo de medição não permitida',
      });
    }
    const result = await this.usecase.perform(data);
    return this.formatedDataResponse(result);
  }

  formatedDataRequest(data: ControllerRequestType) {
    return {
      customerCode: data.params.customer_code,
      type: data.query?.type,
    };
  }

  formatedDataResponse(data: OutputListMeasuresByCustomerUseCase): ControllerResponseType {
    if (data.isLeft()) {
      return notFound(data.value);
    }

    return ok({
      customer_code: data.value.customerCode,
      measures: data.value.measures.map(measure => ({
        measure_uuid: measure.id,
        measure_datetime: measure.dateTime,
        measure_type: measure.type,
        has_confirmed: measure.hasConfirmed,
        image_url: measure.imageUrl,
      })),
    });
  }
}
