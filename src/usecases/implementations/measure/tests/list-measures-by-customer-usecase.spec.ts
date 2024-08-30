import type { ListMeasureEntityModelWithoutCustomerCode } from '@/domain/contracts/measure/list-measure-by-customer-usecase-contract-domai';
import type { MeasureEntityModel } from '@/domain/entities/measure/models';
import { MeasureEnumType } from '@/domain/entities/measure/types/measure-enum-type';
import { UuidAdapter } from '@/infra/id/uuid-adapter/uuid-adapter';
import { right, type Either } from '@/shared/either';
import type { MeasureRepositoryDto } from '@/usecases/contracts/database';
import type { ListMeasuresByCustomerRepositoryUsecaseContract } from '@/usecases/contracts/database/measure/list-measures-by-customer-contract-usecase';
import { ListMeasuresByCustomerUsecase } from '../list-measures-by-customer-usecase';

const listMeasureRepository: MeasureRepositoryDto[] = [
  {
    customerCode: '123',
    type: MeasureEnumType.WATER,
    value: 10,
    id: new UuidAdapter().build(),
    imageUrl: 'url',
    dateTime: new Date(),
    hasConfirmed: false,
  },
  {
    customerCode: '123',
    type: MeasureEnumType.GAS,
    value: 10,
    id: new UuidAdapter().build(),
    imageUrl: 'url',
    dateTime: new Date(),
    hasConfirmed: true,
  },
];

const listReturned: ListMeasureEntityModelWithoutCustomerCode[] = listMeasureRepository.map(
  measure => {
    return {
      id: measure.id,
      type: measure.type,
      value: measure.value,
      dateTime: measure.dateTime,
      imageUrl: measure.imageUrl,
      hasConfirmed: measure.hasConfirmed,
    };
  },
);

const makeRepositoryStub = () => {
  class MeasureRepositoryStub implements ListMeasuresByCustomerRepositoryUsecaseContract {
    async findByFieldList<K extends keyof MeasureEntityModel | 'imageUrl'>(
      field: K,
      value: MeasureRepositoryDto[K],
      filter?: { field: K; value: MeasureRepositoryDto[K] },
    ): Promise<Either<Error, MeasureRepositoryDto[] | null>> {
      if (field === 'customerCode' && value === '123') {
        const list = filter
          ? listMeasureRepository.filter(item => item[filter.field] === filter.value)
          : listMeasureRepository;
        return right(list);
      }

      return right(null);
    }
  }

  return new MeasureRepositoryStub();
};

const makeSut = () => {
  const repository = makeRepositoryStub();
  const sut = new ListMeasuresByCustomerUsecase(repository);
  return { sut, repository };
};

describe('ListMeasuresByCustomerUsecase', () => {
  it('Should return error if no exist customer', async () => {
    const { sut, repository } = makeSut();
    const spy = jest.spyOn(repository, 'findByFieldList');

    const result = await sut.perform({ customerCode: '1234' });
    expect(spy).toHaveBeenCalledWith('customerCode', '1234', undefined);
    expect(result.value).toEqual({
      error_code: 'MEASURES_NOT_FOUND',
      error_description: 'Nenhuma leitura não encontrada',
    });
  });

  it("Should all measures by customer's code", async () => {
    const { sut, repository } = makeSut();
    const spy = jest.spyOn(repository, 'findByFieldList');
    const result = await sut.perform({ customerCode: '123' });
    expect(spy).toHaveBeenCalledWith('customerCode', '123', undefined);
    expect(result.value).toEqual({ customerCode: '123', measures: listReturned });
  });

  it("Should all measures by customer's code and type", async () => {
    const { sut, repository } = makeSut();
    const spy = jest.spyOn(repository, 'findByFieldList');
    const value = MeasureEnumType.GAS;
    const expectList = listReturned.filter(item => item.type === value);

    const result = await sut.perform({ customerCode: '123', type: value });

    expect(spy).toHaveBeenCalledWith('customerCode', '123', { field: 'type', value: value });
    expect(result.value).toEqual({ customerCode: '123', measures: expectList });
  });
});
