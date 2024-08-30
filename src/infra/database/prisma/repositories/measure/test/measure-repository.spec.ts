import { MeasureEnumType } from '@/domain/entities/measure/types/measure-enum-type';
import { right } from '@/shared/either';
import type { MeasureRepositoryDto } from '@/usecases/contracts/database';
import type { PrismaClient } from '@prisma/client';
import { MeasureRepository } from '../measure-repository';

const mockPrismaClient = {
  measure: {
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
  },
};

const makeRepositoryStub = () => {
  return new MeasureRepository(mockPrismaClient as unknown as PrismaClient);
};

describe('MeasureRepository Test', () => {
  it('Should call findByTypeAndCurrentMonth with correct values', async () => {
    const repository = makeRepositoryStub();
    const customerCode = '123';
    const type = 'WATER';
    const date = new Date();

    const spy = jest.spyOn(repository, 'findByTypeAndCurrentMonth');

    await repository.findByTypeAndCurrentMonth(customerCode, type, date);
    expect(spy).toHaveBeenCalledWith(customerCode, type, date);
  });

  it('Should call create with correct values', async () => {
    const repository = makeRepositoryStub();
    const data: MeasureRepositoryDto = {
      customerCode: '123',
      dateTime: new Date(),
      type: MeasureEnumType.WATER,
      value: 10,
      id: '123',
      imageUrl: 'url',
    };
    const spy = jest.spyOn(repository, 'create');

    await repository.create(data);
    expect(spy).toHaveBeenCalledWith(data);
  });

  it('Should return void if create success', async () => {
    const repository = makeRepositoryStub();
    const data: MeasureRepositoryDto = {
      customerCode: '123',
      dateTime: new Date(),
      type: MeasureEnumType.WATER,
      value: 10,
      id: '123',
      imageUrl: 'url',
    };
    const result = await repository.create(data);
    expect(result.isRight()).toBe(true);
  });
  it('should successfully update a measure', async () => {
    const measureRepository = makeRepositoryStub();

    const spy = jest.spyOn(measureRepository, 'update');

    const data: MeasureRepositoryDto = {
      id: 'valid-id',
      customerCode: 'valid-customer-code',
      type: 'WATER' as MeasureEnumType,
      value: 100,
      dateTime: new Date(),
      imageUrl: 'http://example.com/image.png',
      hasConfirmed: true,
    };

    const result = await measureRepository.update(data);

    expect(spy).toHaveBeenCalledWith(data);
    expect(result).toEqual(right());
  });

  it('Should call findByField with correct values', async () => {
    const repository = makeRepositoryStub();
    const field = 'customerCode';
    const value = '123';
    const spy = jest.spyOn(repository, 'findByField');
    await repository.findByField(field, value);
    expect(spy).toHaveBeenCalledWith(field, value);
  });

  it('Should call findByFieldList with correct values', async () => {
    const repository = makeRepositoryStub();
    const field = 'customerCode';
    const value = '123';
    const spy = jest.spyOn(repository, 'findByFieldList');

    await repository.findByFieldList(field, value);
    expect(spy).toHaveBeenCalledWith(field, value);
  });
});
