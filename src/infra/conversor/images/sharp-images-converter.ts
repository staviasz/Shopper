import type {
  ConverterImagesContractsUsecase,
  ImageType,
} from '@/usecases/contracts/converter/images/converter-images-contract-user';
import fsync from 'fs';
import fs from 'fs/promises';

export class SharpImagesConverter implements ConverterImagesContractsUsecase {
  private _absolutePath: string = '';
  constructor() {}

  async imageToBase64(imagePath: string): Promise<string> {
    // const image = await Jimp.read(imagePath);
    // return await image.getBase64Async(Jimp.AUTO);
    // Lê a imagem em um Buffer
    const imageBuffer = fsync.readFileSync(imagePath);

    // Determina o MIME type (simplificado, pode ser mais complexo para outros formatos)
    const mimeType = `image/${imagePath.split('.').at(-1)}`;

    // Cria o cabeçalho base64
    const base64Header = `data:${mimeType};base64,`;

    // Converte o Buffer para base64 e concatena com o cabeçalho
    const base64String = base64Header + imageBuffer.toString('base64');

    return base64String;
  }

  async base64ToImage(base64String: string): Promise<ImageType> {
    try {
      const { base64WithoutHeader, mimeType } = this.removbeHeaderBase64(base64String);

      // const image = await Jimp.read(Buffer.from(base64WithoutHeader, 'base64'));

      // const mimeType = image.getMIME();

      // const outputFilePath = this.absolutePath(mimeType.split('/')[1]);
      // this.createFile(outputFilePath);
      // await image.writeAsync(outputFilePath);

      // return { mimeType, uri: outputFilePath };

      const imageBuffer = Buffer.from(base64WithoutHeader, 'base64');

      const outputFilePath = this.absolutePath(`${mimeType.split('/')[1]}`);
      await fs.writeFile(outputFilePath, imageBuffer);

      return { mimeType, uri: outputFilePath };
    } catch (error) {
      return { mimeType: '', uri: '' };
    }
  }

  async validateBase64(base64String: string): Promise<boolean> {
    try {
      const { base64WithoutHeader } = this.removbeHeaderBase64(base64String);
      Buffer.from(base64WithoutHeader, 'base64');

      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteImageFile(): Promise<void> {
    await fs.unlink(this._absolutePath);
  }

  absolutePath(extensionPath: string = 'jpg') {
    const directory = __dirname;
    const path = `${directory}/temp-image.${extensionPath}`;
    this._absolutePath = path;
    return path;
  }

  removbeHeaderBase64(base64String: string): {
    base64WithoutHeader: string;
    mimeType: string;
  } {
    const [recoverMimeType, base64WithoutHeader] = base64String.split(';base64,');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, mimeType] = recoverMimeType.split(':');
    return {
      base64WithoutHeader,
      mimeType,
    };
  }
}
