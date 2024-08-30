import { makeMeasureListByCustomerUsecase } from '@/factories/usecases/measure/measure-list-by-customer-usecase-factory';
import type { ControllerContractPresentation } from '@/presentation/contracts';
import { MeasureListByCustomerController } from '@/presentation/controllers/measure/measure-list-by-customer-controller';

export const makeMeasureListByCustomerController =
  async (): Promise<ControllerContractPresentation> => {
    const usecase = await makeMeasureListByCustomerUsecase();
    return new MeasureListByCustomerController(usecase);
  };
