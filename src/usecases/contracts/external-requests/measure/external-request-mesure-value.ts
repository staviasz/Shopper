import type { ExtenalRequestContractUsecase } from '../external-requests-contract-usecase';

export type InputExternalRequestMeasureValue = { imageBase64: string; text: string };
export type OutputExternalRequestMeasureValue = Promise<{ textResult: string; imageUrl: string }>;

export interface ExternalRequestMeasureValue extends ExtenalRequestContractUsecase {
  execute(data: InputExternalRequestMeasureValue): OutputExternalRequestMeasureValue;
}
