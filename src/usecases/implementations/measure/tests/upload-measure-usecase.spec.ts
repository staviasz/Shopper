/* eslint-disable @typescript-eslint/no-unused-vars */
import type { InputUploadMeasureUseCase } from '@/domain/contracts/measure/upload-measure-usecase-contract-domain';
import type { CustomError } from '@/domain/entities/measure/errors/custon-error';
import { MeasureEnumType } from '@/domain/entities/measure/types/measure-enum-type';
import { right, type Either } from '@/shared/either';
import type {
  MeasureRepositoryContractsUsecase,
  MeasureRepositoryDto,
} from '@/usecases/contracts/database';
import type {
  ExternalRequestMeasureValue,
  InputExternalRequestMeasureValue,
  OutputExternalRequestMeasureValue,
} from '@/usecases/contracts/external-requests';
import { UploadMeasureUsecase } from '../upload-measure-usecase';

const data: InputUploadMeasureUseCase = {
  imageBase64:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/pmPswAAAABJRU5ErkJggg==',
  dateTime: new Date(),
  type: MeasureEnumType.WATER,
  customerCode: '123',
};

const makeRepositoryStub = () => {
  class RepositoryStub implements MeasureRepositoryContractsUsecase {
    findByTypeAndCurrentMonth(
      type: string,
      date: Date,
    ): Promise<Either<Error, MeasureRepositoryDto | null>> {
      return Promise.resolve(right(null));
    }
    create(data: MeasureRepositoryDto): Promise<Either<CustomError, void>> {
      return Promise.resolve(right());
    }
  }

  return new RepositoryStub();
};

const makeExternalRequestStub = () => {
  class ExternalRequestStub implements ExternalRequestMeasureValue {
    execute(data: InputExternalRequestMeasureValue): OutputExternalRequestMeasureValue {
      return Promise.resolve({ textResult: '123', imageUrl: 'image_url' });
    }
  }
  return new ExternalRequestStub();
};

const makeSut = () => {
  const externalRequest = makeExternalRequestStub();
  const repository = makeRepositoryStub();
  const sut = new UploadMeasureUsecase(repository, externalRequest);
  return { sut, repository, externalRequest };
};

describe('UploadMeasureUsecase Unit Test', () => {
  it('Should return error of domain', async () => {
    const { sut } = makeSut();
    const result = await sut.perform({ ...data, customerCode: '', dateTime: undefined as any });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual([
      { error_code: 'INVALID_DATA', error_description: 'O campo código do cliente é obrigatório' },
      { error_code: 'INVALID_DATA', error_description: 'O campo data e hora é obrigatório' },
    ]);
  });

  it('Should return DOUBLE_REPORT if exists measure in the same month', async () => {
    const { sut, repository } = makeSut();
    jest
      .spyOn(repository, 'findByTypeAndCurrentMonth')
      .mockImplementationOnce(async () => right({} as MeasureRepositoryDto));

    const result = await sut.perform(data);

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual({
      error_code: 'DOUBLE_REPORT',
      error_description: 'Leitura do mês já realizada',
    });
  });

  it("Should call Repository's findByTypeAndCurrentMonth with correct values", async () => {
    const { sut, repository } = makeSut();
    const findByTypeAndCurrentMonthSpy = jest.spyOn(repository, 'findByTypeAndCurrentMonth');
    await sut.perform(data);
    expect(findByTypeAndCurrentMonthSpy).toHaveBeenCalledWith(data.type, data.dateTime);
  });

  it("Should call ExternalRequest's execute with correct values", async () => {
    const { sut, externalRequest } = makeSut();
    const executeSpy = jest.spyOn(externalRequest, 'execute');
    await sut.perform(data);
    expect(executeSpy).toHaveBeenCalledWith({
      imageBase64: data.imageBase64,
      text: 'which number is registered on the meter, answer only the number',
    });
  });

  it("Should call Repository's create with correct values", async () => {
    const { sut, repository } = makeSut();
    const createSpy = jest.spyOn(repository, 'create');
    await sut.perform(data);
    expect(createSpy).toHaveBeenCalledWith({
      customerCode: data.customerCode,
      dateTime: data.dateTime,
      type: data.type,
      value: 123,
      id: expect.any(String),
      imageUrl: 'image_url',
    });
  });

  it('Should return right on success', async () => {
    const { sut } = makeSut();
    const result = await sut.perform(data);
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toEqual({
      imageUrl: 'image_url',
      measureUuid: expect.any(String),
      measureValue: 123,
    });
  });
});
