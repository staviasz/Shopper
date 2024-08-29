import { env } from '@/configs/env';
import type {
  ConverterImagesContractsUsecase,
  ImageType,
} from '@/usecases/contracts/converter/images/converter-images-contract-user';
import type {
  ExternalRequestMeasureValue,
  InputExternalRequestMeasureValue,
  OutputExternalRequestMeasureValue,
} from '@/usecases/contracts/external-requests';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';

export class GeminiApiRequestService implements ExternalRequestMeasureValue {
  constructor(private image: ConverterImagesContractsUsecase) {}

  async execute(data: InputExternalRequestMeasureValue): OutputExternalRequestMeasureValue {
    const { mimeType, uri: uriLocal } = await this.image.base64ToImage(data.imageBase64);

    const { uri: uriCloud } = await this.upload({ mimeType, uri: uriLocal });
    const result = await this.model({ mimeType, uri: uriCloud }, data.text);

    return {
      imageUrl: uriCloud,
      textResult: result,
    };
  }

  async upload(image: ImageType) {
    const fileManager = new GoogleAIFileManager(env.geminiApiKey!);
    const result = await fileManager.uploadFile(image.uri, {
      mimeType: image.mimeType!,
      displayName: image.uri.split('/').pop(),
    });

    const { uri, mimeType, name } = result.file;

    return { uri, mimeType, name };
  }

  async model(image: ImageType, text: string) {
    const genAI = new GoogleGenerativeAI(env.geminiApiKey!);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: image.mimeType!,
          fileUri: image.uri,
        },
      },
      { text },
    ]);

    return result.response.text();
  }
}
