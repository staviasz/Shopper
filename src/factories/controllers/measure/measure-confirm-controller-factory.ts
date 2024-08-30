import { makeMeasureConfirmUsecase } from '@/factories/usecases/measure/measure-confirm-usecase-factory';
import { MeasureConfirmValidator } from '@/infra/validators/zod/measure/measure-confirm-validator';
import type { ControllerContractPresentation } from '@/presentation/contracts';
import { MeasureConfirmController } from '@/presentation/controllers/measure/measure-confirm-controller';

export const makeMeasureConfirmController = async (): Promise<ControllerContractPresentation> => {
  const validator = new MeasureConfirmValidator();
  const usecase = await makeMeasureConfirmUsecase();
  return new MeasureConfirmController(validator, usecase);
};
