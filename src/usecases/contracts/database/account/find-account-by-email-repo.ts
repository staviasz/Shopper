import { AccountModel } from '@/domain/models/account/account-model';

export interface FindAccountByEmailRepo {
  execute: (email: string) => Promise<null | AccountModel>;
}
