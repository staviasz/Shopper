import { Either } from '@/shared/either';
import { Account } from './account';
import { InvalidEmailFormatError, InvalidPasswordFormatError } from './errors';
// import { CreatedAt, UpdatedAt, VerifiedAt } from './value-objects';

export type CreateAccountData = {
  id: string;
  email: string;
  password: string;
  permissions: string[];
  isVerified?: boolean;
  updatedAt?: Date;
  createdAt?: Date;
  // profileId?: string | null;
};

export type UserEntityErrors = Error | InvalidEmailFormatError | InvalidPasswordFormatError;

export type CreateAccountResponse = Either<UserEntityErrors, Account>;
