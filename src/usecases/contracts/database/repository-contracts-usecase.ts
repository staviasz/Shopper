import { Either } from '@/shared/either';
import { FormatedEntityArrayErrors } from '@/shared/errors';

export interface FindByFieldRepositoryContract<T> {
  findByField<K extends keyof T>(field: K, value: T[K]): Promise<Either<FormatedEntityArrayErrors, T | null>>;
}

export interface CreateRepositoryContract<T> {
  create(entity: T): Promise<Either<FormatedEntityArrayErrors, T | null>>;
}
