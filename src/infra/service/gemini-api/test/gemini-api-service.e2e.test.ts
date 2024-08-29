import { SharpImagesConverter } from '@/infra/conversor/images/sharp-images-converter';
import path from 'path';
import { GeminiApiRequestService } from '../gemini-api-request-service';

const makeSut = () => {
  const sharp = new SharpImagesConverter();
  const sut = new GeminiApiRequestService(sharp);
  return { sut, sharp };
};

const absolutePath = (relativePath: string) => {
  const currentDirectory = __dirname;
  return path.join(currentDirectory, relativePath);
};

describe('GeminiApiService Test', () => {
  it('Should', async () => {
    const absoluteImagePath = absolutePath('./mock/download.jpeg');
    const { sut } = makeSut();
    const image = await sut.upload({ uri: absoluteImagePath, mimeType: 'image/jpeg' });
    const result = await sut.model(
      image,
      'which number is registered on the meter, answer only the number',
    );
    expect(result).toBeTruthy();
  }, 10000);
  it('Should success execute', async () => {
    const absoluteImagePath = absolutePath('./mock/download.jpeg');
    const { sut, sharp } = makeSut();
    const image = await sharp.imageToBase64(absoluteImagePath);
    const { textResult, imageUrl } = await sut.execute({
      imageBase64: image,
      text: 'which number is registered on the meter, answer only the number',
    });

    expect(textResult).toEqual(expect.any(String));
    expect(imageUrl).toContain('https://generativelanguage.googleapis.com');
  });
});
