import type { CustomError } from '@/domain/entities/measure/errors/custon-error';
import type { Either } from '@/shared/either';

export interface FindByFieldRepositoryContract<T> {
  findByField<K extends keyof T>(field: K, value: T[K]): Promise<Either<Error, T | null>>;
}

export interface CreateRepositoryContract<T> {
  create(data: T): Promise<Either<CustomError, void>>;
}

export interface UpdateRepositoryContract<T> {
  update(data: Partial<T>): Promise<Either<CustomError, void>>;
}

export interface FindByFieldListRepositoryContract<T> {
  findByFieldList<K extends keyof T>(
    field: K,
    value: T[K],
    filter?: { field: K; value: T[K] },
  ): Promise<Either<Error, T[] | null>>;
}

export interface FindMeasureByTypeAndCurrentMonth<T> {
  findByTypeAndCurrentMonth: (
    costumerCode: string,
    type: string,
    date: Date,
  ) => Promise<Either<CustomError, T | null>>;
}
