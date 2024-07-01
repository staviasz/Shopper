export interface DeleteAccountRepo {
  execute: (id: string) => Promise<void>;
}
