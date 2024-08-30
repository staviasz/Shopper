/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  ConfirmMeasureUseCaseContractDomain,
  InputConfirmMeasureUseCase,
  OutputConfirmMeasureUseCase,
} from '@/domain/contracts/measure/confirm-measure-usecase-contract-domai';
import { MeasureConfirmValidator } from '@/infra/validators/zod/measure/measure-confirm-validator';
import { right } from '@/shared/either';
import { MeasureConfirmController } from '../measure-confirm-controller';

const makeMeasureUsecaseStub = () => {
  class MeasureUsecaseStub implements ConfirmMeasureUseCaseContractDomain {
    async perform(data: InputConfirmMeasureUseCase): Promise<OutputConfirmMeasureUseCase> {
      return right({ success: true });
    }
  }

  return new MeasureUsecaseStub();
};

const makeSut = () => {
  const usecase = makeMeasureUsecaseStub();
  const validator = new MeasureConfirmValidator();
  const sut = new MeasureConfirmController(validator, usecase);

  return { sut, validator, usecase };
};

const data = {
  measure_uuid: '123',
  confirmed_value: 10,
};

const dataToUseCase = {
  id: '123',
  value: 10,
};

describe('MeasureConfirmController spec', () => {
  it('Should return errors of validator', async () => {
    const { sut } = makeSut();
    const result = await sut.handle({ body: {} });

    expect(result).toEqual({
      statusCode: 400,
      body: {
        error_code: 'INVALID_DATA',
        error_description: 'O campo id é obrigatório, O campo valor é obrigatório',
      },
    });
  });

  it('Should return error of usecase', async () => {
    const { sut, usecase } = makeSut();

    const spy = jest.spyOn(usecase, 'perform');
    await sut.handle({ body: data });
    expect(spy).toHaveBeenCalledWith(dataToUseCase);
  });

  it('Should return success of usecase', async () => {
    const { sut } = makeSut();
    const result = await sut.handle({ body: data });
    expect(result).toEqual({
      statusCode: 200,
      body: {
        success: true,
      },
    });
  });
});
