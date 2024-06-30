export type AccountModel = {
  id: string;
  email: string;
  password: string;
  verifiedAt?: Date | null;
  updatedAt?: Date | null;
  createdAt?: Date | null;
  // profileId?: string | null;
};
