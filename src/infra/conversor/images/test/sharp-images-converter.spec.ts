import fs from 'fs';
import path from 'path';
import { SharpImagesConverter } from '../sharp-images-converter';

const makeSut = () => {
  const sut = new SharpImagesConverter();
  return { sut };
};

const absolutePath = (relativePath: string) => {
  const currentDirectory = __dirname;
  return path.join(currentDirectory, relativePath);
};

describe('SharpImagesConverter Test', () => {
  it('Shold convert image', async () => {
    const absoluteImagePath = absolutePath('./mock/medidor.jpeg');
    const { sut } = makeSut();

    const result = await sut.imageToBase64(absoluteImagePath);

    expect(result).toBeTruthy();
    expect(result.slice(0, 27)).toBe('data:image/jpeg;base64,/9j/');
  });

  it('Shold convert base64 to image', async () => {
    const absoluteImagePath = absolutePath('./mock/medidor.jpeg');
    const absoluteImagePathOutput = absolutePath('../temp-image.jpeg');

    const { sut } = makeSut();

    const resultbase64 = await sut.imageToBase64(absoluteImagePath);

    const result = await sut.base64ToImage(resultbase64);

    let fileExists = fs.existsSync(absoluteImagePathOutput);

    expect(fileExists).toBeTruthy();

    await sut.deleteImageFile();

    fileExists = fs.existsSync(absoluteImagePathOutput);
    expect(fileExists).toBeFalsy();

    expect(result.mimeType).toBe('image/jpeg');
    expect(result.uri).toEqual(absoluteImagePathOutput);
  });

  it('Shold validate base64', async () => {
    const absoluteImagePath = absolutePath('./mock/medidor.jpeg');
    const { sut } = makeSut();

    const result = await sut.validateBase64(await sut.imageToBase64(absoluteImagePath));

    expect(result).toBeTruthy();
  });
});
