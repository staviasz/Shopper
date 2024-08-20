import { ContractDomain } from '@/domain/contracts/contract-domain';
import { CustomerModel } from '@/domain/entities/customer/models';

export type InputCustomerModel = Omit<CustomerModel, 'id'>;

export interface RegisterCustomerContractDomain extends ContractDomain {
  perform(data: InputCustomerModel): Promise<void>;
}
