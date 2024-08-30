/* eslint-disable @typescript-eslint/no-unused-vars */
import type { InputConfirmMeasureUseCase } from '@/domain/contracts/measure/confirm-measure-usecase-contract-domai';
import type { CustomError } from '@/domain/entities/measure/errors/custon-error';
import { UuidAdapter } from '@/infra/id/uuid-adapter/uuid-adapter';
import type { Either } from '@/shared/either';
import { right } from '@/shared/either';
import type { MeasureRepositoryDto } from '@/usecases/contracts/database';
import type { MeasuresConfirmRepositoryUsecaseContract } from '@/usecases/contracts/database/measure/measures-confirm-contract-usecase';
import { ConfirmMeasureUsecase } from '../confirm-measure-usecase';

const makeRepositoryStub = () => {
  class RepositoryStub implements MeasuresConfirmRepositoryUsecaseContract {
    findByField<K extends keyof MeasureRepositoryDto>(
      field: K,
      value: MeasureRepositoryDto[K],
    ): Promise<Either<Error, MeasureRepositoryDto | null>> {
      return Promise.resolve(
        right({
          customerCode: '123',
          type: 'WATER',
          value: 10,
          id: new UuidAdapter().build(),
          imageUrl: 'url',
          dateTime: new Date(),
          hasConfirmed: false,
        } as MeasureRepositoryDto),
      );
    }

    update(data: MeasureRepositoryDto): Promise<Either<CustomError, void>> {
      return Promise.resolve(right());
    }
  }

  return new RepositoryStub();
};

const data: InputConfirmMeasureUseCase = {
  id: '123',
  value: 50,
};

const makeSut = () => {
  const repository = makeRepositoryStub();
  const sut = new ConfirmMeasureUsecase(repository);
  return { sut, repository };
};

describe('ConfirmMeasureUsecase spec', () => {
  it('should return error if measure not found', async () => {
    const { sut, repository } = makeSut();
    jest
      .spyOn(repository, 'findByField')
      .mockImplementationOnce(() => Promise.resolve(right(null)));
    const result = await sut.perform(data);

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual({
      error_code: 'MEASURE_NOT_FOUND',
      error_description: 'Leitura do mês não realizada',
    });
  });

  it('Should return error if measure already confirmed', async () => {
    const { sut, repository } = makeSut();
    jest.spyOn(repository, 'findByField').mockImplementationOnce(() =>
      Promise.resolve(
        right({
          customerCode: '123',
          type: 'WATER',
          value: 10,
          id: '123',
          imageUrl: 'url',
          dateTime: new Date(),
          hasConfirmed: true,
        } as MeasureRepositoryDto),
      ),
    );
    const result = await sut.perform(data);

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual({
      error_code: 'CONFIRMATION_DUPLICATE',
      error_description: 'Leitura do mês já realizada',
    });
  });

  it('Should return error domain', async () => {
    const { sut, repository } = makeSut();
    const result = await sut.perform({ ...data, value: -1 });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual({
      error_code: 'INVALID_DATA',
      error_description: 'O campo valor deve ser um número positivo',
    });
  });

  it('Should return success', async () => {
    const { sut, repository } = makeSut();
    const result = await sut.perform(data);
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toEqual({ success: true });
  });
});
