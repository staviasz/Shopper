import { InputCustomerModel } from '@/domain/contracts';

export type InputRegisterCustomerDto = InputCustomerModel & {
  password: string;
  acceptedTerms?: boolean;
};
