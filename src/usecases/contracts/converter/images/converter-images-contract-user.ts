export type ImageType = {
  mimeType?: string;
  uri: string;
};

export interface ConverterImagesContractsUsecase {
  imageToBase64(file: string): Promise<string>;
  base64ToImage(base64: string): Promise<ImageType>;
  validateBase64(base64: string): Promise<boolean>;
}
