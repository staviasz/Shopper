export interface UpdateProfileRepo {
  // TODO: Change data type from any to ProfileModel
  execute: (profileId: string, data: any) => Promise<void>;
}
