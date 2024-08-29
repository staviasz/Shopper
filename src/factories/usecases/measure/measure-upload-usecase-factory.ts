import { makeMeasureRepository } from '@/factories/infra';
import { makeGeminiApiRequestService } from '@/factories/infra/service/gemini-api/gemini-api-request-service-factory';
import { UploadMeasureUsecase } from '@/usecases/implementations/measure/upload-measure-usecase';

export const makeMeasureUploadUsecase = async () => {
  const repository = await makeMeasureRepository();
  const externalRequest = makeGeminiApiRequestService();
  return new UploadMeasureUsecase(repository, externalRequest);
};
