import type {
  ConfirmMeasureUseCaseContractDomain,
  OutputConfirmMeasureUseCase,
} from '@/domain/contracts/measure/confirm-measure-usecase-contract-domai';
import type { ObjectError } from '@/domain/entities/measure/errors/custon-error';
import type { ControllerContractPresentation, ValidationContract } from '@/presentation/contracts';
import { badRequest, doubleRequest, notFound, ok } from '@/presentation/helpers/http-helpers';
import type { ControllerRequestType, ControllerResponseType } from '@/presentation/types';

export class MeasureConfirmController implements ControllerContractPresentation {
  constructor(
    private validator: ValidationContract,
    private usecase: ConfirmMeasureUseCaseContractDomain,
  ) {}
  async handle(request: ControllerRequestType): Promise<ControllerResponseType> {
    const data = this.formatedDataBody(request.body);

    const errors = this.validator.validate(data);
    if (errors.isLeft()) {
      return badRequest(errors.value);
    }

    const result = await this.usecase.perform(data);

    return this.returnedResponse(result);
  }

  formatedDataBody(data: any) {
    return {
      id: data.measure_uuid,
      value: data.confirmed_value,
    };
  }

  returnedResponse(data: OutputConfirmMeasureUseCase): ControllerResponseType {
    if (data.isLeft()) {
      const { error_code } = data.value as ObjectError;
      switch (error_code) {
        case 'INVALID_DATA':
          return badRequest(data.value);
        case 'MEASURE_NOT_FOUND':
          return notFound(data.value);
        case 'CONFIRMATION_DUPLICATE':
          return doubleRequest(data.value);
      }
    }

    return ok(data.value);
  }
}
