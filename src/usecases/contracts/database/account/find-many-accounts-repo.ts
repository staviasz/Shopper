import { AccountModel } from '@/domain/models/account/account-model';

export interface FindManyAccountsRepo {
  execute: () => Promise<[] | AccountModel[]>;
}
