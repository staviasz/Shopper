import type {
  InputUploadMeasureUseCase,
  OutputUploadMeasureUseCase,
  UploadMeasureResultType,
  UploadMeasureUseCaseContractDomain,
} from '@/domain/contracts';
import type { ObjectError } from '@/domain/entities/measure/errors/custon-error';
import type { ControllerContractPresentation, ValidationContract } from '@/presentation/contracts';
import { badRequest, doubleRequest, ok } from '@/presentation/helpers/http-helpers';
import type { ControllerRequestType, ControllerResponseType } from '@/presentation/types';
import type { ConverterImagesContractsUsecase } from '@/usecases/contracts/converter/images/converter-images-contract-user';
import { convertDatetimeStringToDate } from '@/utils/convert-datetime-string-to-date';

export class MeasureUploadController implements ControllerContractPresentation {
  constructor(
    private validator: ValidationContract,
    private usecase: UploadMeasureUseCaseContractDomain,
    private validateImage: ConverterImagesContractsUsecase,
  ) {}
  async handle(request: ControllerRequestType): Promise<ControllerResponseType> {
    const data: InputUploadMeasureUseCase = this.convertToInputUsecase(request);

    const errors = this.validator.validate(data);

    if (errors.isLeft()) {
      return badRequest(errors.value);
    }

    const imageBase64IsValid = await this.validateImage.validateBase64(data.imageBase64);

    if (!imageBase64IsValid) {
      return badRequest({
        error_code: 'INVALID_DATA',
        error_description: 'Imagem base64 inválida',
      });
    }

    data.dateTime = convertDatetimeStringToDate(data.dateTime as unknown as string)!;

    const result = await this.usecase.perform(data);

    return this.returnedResponse(result);
  }

  convertToInputUsecase(data: ControllerRequestType): InputUploadMeasureUseCase {
    const { body } = data;
    return {
      imageBase64: body.image,
      dateTime: body.measure_datetime,
      type: body.measure_type,
      customerCode: body.customer_code,
    };
  }

  convertToDataresponse(data: UploadMeasureResultType) {
    return {
      image_url: data.imageUrl,
      measure_value: data.measureValue,
      measure_uuid: data.measureUuid,
    };
  }

  returnedResponse(result: OutputUploadMeasureUseCase) {
    if (result.isLeft()) {
      const { error_code } = result.value as ObjectError;
      switch (error_code) {
        case 'INVALID_DATA':
          return badRequest(result.value);
        case 'DOUBLE_REPORT':
          return doubleRequest(result.value);
        default:
          break;
      }
    }
    return ok(this.convertToDataresponse(result.value as UploadMeasureResultType));
  }
}
