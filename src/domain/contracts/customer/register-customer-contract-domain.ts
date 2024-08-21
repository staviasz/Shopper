import { ContractDomain } from '@/domain/contracts/contract-domain';
import { CustomerModel } from '@/domain/entities/customer/models';

export type InputCustomerDto = Omit<CustomerModel, 'id'>;

export type OutputCustomerDto = { errors: string[] } | void;

export interface RegisterCustomerContractDomain extends ContractDomain {
  perform(data: InputCustomerDto): OutputCustomerDto;
}
