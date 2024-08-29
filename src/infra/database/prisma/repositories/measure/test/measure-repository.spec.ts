import { MeasureEnumType } from '@/domain/entities/measure/types/measure-enum-type';
import type { MeasureRepositoryDto } from '@/usecases/contracts/database';
import type { PrismaClient } from '@prisma/client';
import { MeasureRepository } from '../measure-repository';

const mockPrismaClient = {
  measure: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
};

const makeRepositoryStub = () => {
  return new MeasureRepository(mockPrismaClient as unknown as PrismaClient);
};

describe('MeasureRepository Test', () => {
  it('Should call findByTypeAndCurrentMonth with correct values', async () => {
    const repository = makeRepositoryStub();
    const type = 'WATER';
    const date = new Date();

    const spy = jest.spyOn(repository, 'findByTypeAndCurrentMonth');

    await repository.findByTypeAndCurrentMonth(type, date);
    expect(spy).toHaveBeenCalledWith(type, date);
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
});
