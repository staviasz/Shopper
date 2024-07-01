export interface FindOneProfileRepo {
  // TODO: Change the return from any to ProfileModel
  execute: (profileId: string) => Promise<any>;
}
