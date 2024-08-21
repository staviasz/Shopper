import { RegisterCustomerContractDomain } from '@/domain/contracts';
import { CustomerEntity } from '@/domain/entities/customer/customer-entity';
import { CustomerRepositoryContractsUsecase } from '@/usecases/contracts/database';
import { OutputCustomerDto } from './../../../../domain/contracts/customer/register-customer-contract-domain';
import { InputRegisterCustomerDto } from './register-customer-dto';

export class RegisterCustomerUsecase implements RegisterCustomerContractDomain {
  constructor(private repository: CustomerRepositoryContractsUsecase) {}
  async perform(data: InputRegisterCustomerDto): Promise<OutputCustomerDto> {
    const entity = CustomerEntity.create({ ...data });

    if (entity.isLeft()) {
      return entity.errorFormatted();
    }

    const existsEmail = await this.repository.findByField('email', data.email);

    if (existsEmail.isLeft()) {
      return existsEmail.errorFormatted();
    }

    const result = await this.repository.create(entity.value);
    if (result.isLeft()) {
      return result.errorFormatted();
    }
    return;
  }
}
