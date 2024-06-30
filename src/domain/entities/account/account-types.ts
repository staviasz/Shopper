import { Either } from '@/shared/either';
import { Account } from './account';
import {
  InvalidEmailFormatError,
  PasswordHasSpaceError,
  PasswordLengthError,
  PasswordMissingHigherCaseLetterError,
  PasswordMissingLowerCaseLetterError,
  PasswordMissingNumberError,
  PasswordMissingSpecialCharacterError,
} from './errors';
// import { CreatedAt, UpdatedAt, VerifiedAt } from './value-objects';

export type CreateAccountData = {
  id: string;
  email: string;
  password: string;
  permissions: string[];
  verifiedAt?: Date;
  updatedAt?: Date;
  createdAt?: Date;
  // profileId?: string | null;
};

export type UserEntityErrors =
  | Error
  | InvalidEmailFormatError
  | PasswordHasSpaceError
  | PasswordLengthError
  | PasswordMissingHigherCaseLetterError
  | PasswordMissingLowerCaseLetterError
  | PasswordMissingNumberError
  | PasswordMissingSpecialCharacterError;

export type CreateAccountResponse = Either<UserEntityErrors, Account>;
