import { makeMeasureRepository } from '@/factories/infra';
import { ConfirmMeasureUsecase } from '@/usecases/implementations/measure/confirm-measure-usecase';

export const makeMeasureConfirmUsecase = async () => {
  const repository = await makeMeasureRepository();
  return new ConfirmMeasureUsecase(repository);
};
