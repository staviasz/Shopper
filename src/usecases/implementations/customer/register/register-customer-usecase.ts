import { RegisterCustomerContractDomain } from '@/domain/contracts';
import { InputRegisterCustomerDto } from './register-customer-dto';

export class RegisterCustomerUsecase implements RegisterCustomerContractDomain {
  perform(data: InputRegisterCustomerDto): Promise<void> {
    console.log(data);
    return Promise.resolve();
  }
}
