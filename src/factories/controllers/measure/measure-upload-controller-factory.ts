import { makeSharpImageConverter } from '@/factories/infra/converter/images/sharp-image-converter-factory';
import { makeMeasureUploadUsecase } from '@/factories/usecases/measure/measure-upload-usecase-factory';
import { MeasureUploadValidator } from '@/infra/validators';
import type { ControllerContractPresentation } from '@/presentation/contracts';
import { MeasureUploadController } from '@/presentation/controllers/measure';

export const makeMeasureUploadController = async (): Promise<ControllerContractPresentation> => {
  const validator = new MeasureUploadValidator();
  const usecase = await makeMeasureUploadUsecase();
  const validatorImages = makeSharpImageConverter();
  return new MeasureUploadController(validator, usecase, validatorImages);
};
