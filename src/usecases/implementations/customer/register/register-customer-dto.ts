import { InputCustomerDto } from '@/domain/contracts';

export type InputRegisterCustomerDto = InputCustomerDto & {
  password: string;
  acceptedTerms?: boolean;
};
