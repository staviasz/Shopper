import { CustomerEntity } from '@/domain/entities/customer/customer-entity';
import { Either, left, right } from '@/shared/either';
import { FormatedEntityArrayErrors } from '@/shared/errors';
import { makeErrorsInObjOfArray } from '@/shared/make-errors-in-obj-of-array';
import { CustomerRepositoryContractsUsecase } from '@/usecases/contracts/database';
import { InputRegisterCustomerDto } from './register-customer-dto';
import { RegisterCustomerUsecase } from './register-customer-usecase';

const data: InputRegisterCustomerDto = {
  name: 'Customer',
  email: 'email@teste.com',
  password: '123456',
  acceptedTerms: true,
};

const repositoryStub = () => {
  class CustomerRepository implements CustomerRepositoryContractsUsecase {
    async findByField<K extends keyof CustomerEntity>(
      field: K,
      value: CustomerEntity[K],
    ): Promise<Either<FormatedEntityArrayErrors, CustomerEntity | null>> {
      return Promise.resolve(right({ field, value, ...data, id: '1' } as unknown as CustomerEntity));
    }
    async create(entity: CustomerEntity): Promise<Either<FormatedEntityArrayErrors, CustomerEntity | null>> {
      return Promise.resolve(right(entity));
    }
  }

  return {
    repository: new CustomerRepository(),
  };
};

const makeSut = () => {
  const repository = repositoryStub().repository;
  const sut = new RegisterCustomerUsecase(repository);
  return {
    sut,
    repository,
  };
};

describe('Register Customer Usecase unit', () => {
  it('Should return domain errors ', async () => {
    const { sut } = makeSut();
    const output = await sut.perform({
      ...data,
      acceptedTerms: false,
      name: 'customer *',
    });
    expect(output).toEqual({
      errors: ['O nome deve ter pelo menos 3 caracteres e apenas letras', 'Os termos de uso devem ser aceitos'],
    });
  });

  it('should return error if email exists', async () => {
    const { sut, repository } = makeSut();
    jest
      .spyOn(repository, 'findByField')
      .mockResolvedValueOnce(left(makeErrorsInObjOfArray(['O email informado já existe'])));

    const output = await sut.perform(data);

    expect(output).toEqual({
      errors: ['O email informado já existe'],
    });
  });

  it('should return error if create fails', async () => {
    const { sut, repository } = makeSut();
    jest.spyOn(repository, 'create').mockResolvedValueOnce(left(makeErrorsInObjOfArray(['Erro interno'])));
    const output = await sut.perform(data);
    expect(output).toEqual({
      errors: ['Erro interno'],
    });
  });

  it('should return customer on success', async () => {
    const { sut } = makeSut();
    const output = await sut.perform(data);
    expect(output).toBeUndefined();
  });
});
