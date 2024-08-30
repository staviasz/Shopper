import type { CustomError } from '@/domain/entities/measure/errors/custon-error';
import type { MeasureEntityModel } from '@/domain/entities/measure/models';
import type { MeasureEnumType } from '@/domain/entities/measure/types/measure-enum-type';
import type { Either } from '@/shared/either';

export type InputListMeasuresByCustomerUseCase = { customerCode: string; type?: MeasureEnumType };

export type ListMeasureEntityModelWithoutCustomerCode = Omit<MeasureEntityModel, 'customerCode'>;

export type ListMeasuresByCustomer = {
  customerCode: string;
  measures: ListMeasureEntityModelWithoutCustomerCode[];
};

export type OutputListMeasuresByCustomerUseCase = Either<CustomError, ListMeasuresByCustomer>;

export interface ListMeasuresByCustomerUseCaseContractDomain {
  perform(data: InputListMeasuresByCustomerUseCase): Promise<OutputListMeasuresByCustomerUseCase>;
}
