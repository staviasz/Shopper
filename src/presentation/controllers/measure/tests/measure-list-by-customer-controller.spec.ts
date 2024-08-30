import type {
  InputListMeasuresByCustomerUseCase,
  ListMeasuresByCustomer,
  ListMeasuresByCustomerUseCaseContractDomain,
  OutputListMeasuresByCustomerUseCase,
} from '@/domain/contracts/measure/list-measure-by-customer-usecase-contract-domai';
import { right } from '@/shared/either';
import { MeasureListByCustomerController } from '../measure-list-by-customer-controller';

const makeMeasureLisUsecase = () => {
  class ListMeasuresByCustomerUsecaseStub implements ListMeasuresByCustomerUseCaseContractDomain {
    async perform(
      data: InputListMeasuresByCustomerUseCase,
    ): Promise<OutputListMeasuresByCustomerUseCase> {
      return right({
        customerCode: data.customerCode,
        measures: [
          {
            id: '123',
            type: 'WATER',
            value: 10,
            dateTime: '30/08/2024' as unknown as Date,
            imageUrl: 'url',
            hasConfirmed: false,
          },
        ],
      } as ListMeasuresByCustomer);
    }
  }
  return new ListMeasuresByCustomerUsecaseStub();
};

const makeSut = () => {
  const usecase = makeMeasureLisUsecase();
  const sut = new MeasureListByCustomerController(usecase);
  return { sut, usecase };
};

describe('MeasureListByCustomerController', () => {
  it('Should return error if no received customer', async () => {
    const { sut } = makeSut();
    const result = await sut.handle({ params: { customerCode: '' } });
    expect(result).toEqual({
      statusCode: 400,
      body: {
        error_code: 'INVALID_DATA',
        error_description: 'O campo de cliente é obrigatório e deve ser uma string',
      },
    });
  });

  it('Should return error if received invalid type', async () => {
    const { sut } = makeSut();
    const result = await sut.handle({
      params: { customer_code: '123' },
      query: { type: 'invalid' },
    });
    expect(result).toEqual({
      statusCode: 400,
      body: {
        error_code: 'INVALID_TYPE',
        error_description: 'Tipo de medição não permitida',
      },
    });
  });

  it('Should return measures', async () => {
    const { sut } = makeSut();
    const result = await sut.handle({
      params: { customer_code: '123' },
    });

    expect(result).toEqual({
      statusCode: 200,
      body: {
        customer_code: '123',
        measures: [
          {
            measure_uuid: '123',
            measure_type: 'WATER',
            measure_datetime: '30/08/2024' as unknown as Date,
            image_url: 'url',
            has_confirmed: false,
          },
        ],
      },
    });
  });
});
