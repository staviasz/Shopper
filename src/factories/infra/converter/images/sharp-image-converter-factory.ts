import { SharpImagesConverter } from '@/infra/conversor/images/sharp-images-converter';
import type { ConverterImagesContractsUsecase } from '@/usecases/contracts/converter/images/converter-images-contract-user';

export const makeSharpImageConverter = (): ConverterImagesContractsUsecase => {
  return new SharpImagesConverter();
};
