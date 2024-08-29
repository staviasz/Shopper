import { GeminiApiRequestService } from '@/infra/service/gemini-api/gemini-api-request-service';
import type { ExternalRequestMeasureValue } from '@/usecases/contracts/external-requests';
import { makeSharpImageConverter } from '../../converter/images/sharp-image-converter-factory';

export const makeGeminiApiRequestService = (): ExternalRequestMeasureValue => {
  const converterImage = makeSharpImageConverter();
  return new GeminiApiRequestService(converterImage);
};
