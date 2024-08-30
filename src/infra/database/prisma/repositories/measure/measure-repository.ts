import type { CustomError } from '@/domain/entities/measure/errors/custon-error';
import type { MeasureEnumType } from '@/domain/entities/measure/types/measure-enum-type';
import { right, type Either } from '@/shared/either';
import type {
  MeasureRepositoryContractsUsecase,
  MeasureRepositoryDto,
} from '@/usecases/contracts/database';
import type { PrismaClient } from '@prisma/client';

export class MeasureRepository implements MeasureRepositoryContractsUsecase {
  constructor(private client: PrismaClient) {}

  async findByTypeAndCurrentMonth(
    type: string,
    date: Date,
  ): Promise<Either<CustomError, MeasureRepositoryDto | null>> {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);

    const prisma = this.client;

    const measure = await prisma.measure.findFirst({
      where: {
        type: type.toUpperCase() as MeasureEnumType,
        dateTimeOfRead: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    return measure
      ? right({
          customerCode: measure.customerCode,
          dateTime: measure.dateTimeOfRead,
          id: measure.id,
          type: measure.type,
          imageUrl: measure.imageUrl,
          Value: measure.value,
        } as MeasureRepositoryDto)
      : right(null);
  }

  async create(data: MeasureRepositoryDto): Promise<Either<CustomError, void>> {
    const prisma = this.client;
    await prisma.measure.create({
      data: {
        customerCode: data.customerCode,
        dateTimeOfRead: data.dateTime,
        type: data.type,
        imageUrl: data.imageUrl,
        value: data.value!,
        id: data.id,
        hasConfirmed: data.hasConfirmed || false,
      },
    });
    return right();
  }

  async update(data: MeasureRepositoryDto): Promise<Either<CustomError, void>> {
    const prisma = this.client;
    await prisma.measure.update({
      where: {
        id: data.id,
      },
      data: { ...data },
    });
    return right();
  }

  async findByField<K extends keyof MeasureRepositoryDto>(
    field: K,
    value: MeasureRepositoryDto[K],
  ): Promise<Either<Error, MeasureRepositoryDto | null>> {
    const prisma = this.client;
    const measure = await prisma.measure.findFirst({
      where: {
        [field]: value,
      },
    });
    return right(
      !measure
        ? null
        : ({
            customerCode: measure?.customerCode,
            dateTime: measure?.dateTimeOfRead,
            id: measure?.id,
            type: measure?.type,
            imageUrl: measure?.imageUrl,
            Value: measure?.value,
          } as MeasureRepositoryDto),
    );
  }
}
