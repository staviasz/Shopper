import { AccountModel } from '@/domain/models/account/account-model';

export interface CreateAccountRepo {
  execute: (data: AccountModel) => Promise<void>;
}
