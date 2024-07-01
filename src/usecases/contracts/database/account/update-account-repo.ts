import { AccountModel } from '@/domain/models/account/account-model';

export interface UpdateAccountRepo {
  execute: (data: AccountModel) => Promise<void>;
}
