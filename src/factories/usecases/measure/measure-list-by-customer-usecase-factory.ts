import { makeMeasureRepository } from '@/factories/infra';
import { ListMeasuresByCustomerUsecase } from '@/usecases/implementations/measure/list-measures-by-customer-usecase';

export const makeMeasureListByCustomerUsecase = async () => {
  const repository = await makeMeasureRepository();
  return new ListMeasuresByCustomerUsecase(repository);
};
