import { PrismaHelper } from '@/infra/database/prisma/helpers';
import { MeasureRepository } from '@/infra/database/prisma/repositories/measure/measure-repository';
import type { MeasureRepositoryContractsUsecase } from '@/usecases/contracts/database';

export const makeMeasureRepository = async (): Promise<MeasureRepositoryContractsUsecase> => {
  const client = await PrismaHelper.getPrisma();
  return new MeasureRepository(client);
};
