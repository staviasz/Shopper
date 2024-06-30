import { ValueObject } from '@/shared/domain';
import { Either, left, right } from '@/shared/either';
import {
  PasswordLengthError,
  PasswordHasSpaceError,
  PasswordMissingHigherCaseLetterError,
  PasswordMissingLowerCaseLetterError,
  PasswordMissingNumberError,
  PasswordMissingSpecialCharacterError,
} from '../../errors';

type PasswordErrors =
  | PasswordLengthError
  | PasswordHasSpaceError
  | PasswordMissingSpecialCharacterError
  | PasswordMissingHigherCaseLetterError
  | PasswordMissingLowerCaseLetterError
  | PasswordMissingNumberError;

export class Password extends ValueObject {
  private constructor(password: string) {
    super(password);
    Object.freeze(password);
  }

  static create(password: string): Either<PasswordErrors, Password> {
    if (!this.validatePasswordLength(password)) {
      return left(new PasswordLengthError(password.length));
    }
    if (!this.validateIfHasSpace(password)) {
      return left(new PasswordHasSpaceError());
    }
    if (!this.validateIfContainsSpecialCharacters(password)) {
      return left(new PasswordMissingSpecialCharacterError());
    }
    if (!this.validateIfContainsHigherCaseLetter(password)) {
      return left(new PasswordMissingHigherCaseLetterError());
    }
    if (!this.validateIfContainsLowerCaseLetter(password)) {
      return left(new PasswordMissingLowerCaseLetterError());
    }
    if (!this.validateIfContainsNumber(password)) {
      return left(new PasswordMissingNumberError());
    }

    return right(new Password(password));
  }

  static validatePasswordLength(password: string): boolean {
    return Boolean(password.trim().length >= 8 && password.trim().length <= 32);
  }

  static validateIfHasSpace(password: string): boolean {
    return Boolean(password.split(' ').length === 1);
  }

  static validateIfContainsSpecialCharacters(password: string): boolean {
    return Boolean(/^(?=.*[!@#$%^&*(),.?":{}|<>]).*$/.test(password));
  }

  static validateIfContainsHigherCaseLetter(password: string): boolean {
    return Boolean(/^(?=.*[A-Z]).*$/.test(password));
  }

  static validateIfContainsLowerCaseLetter(password: string): boolean {
    return Boolean(/^(?=.*[a-z]).*$/.test(password));
  }

  static validateIfContainsNumber(password: string): boolean {
    return Boolean(/^(?=.*\d).*$/.test(password));
  }
}
