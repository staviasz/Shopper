import { Password } from './password';
import { InvalidPasswordFormatError } from '../../errors';

/**
 * @group domain
 * @group models
 * @group models/user
 */
describe('Password ValueObject', () => {
  it('Should return a Password if password is correct', () => {
    const password = 'Abc123#21';
    const sut = Password.create(password);
    expect(sut.value).toEqual({ props: password });
  });

  it('Should return PasswordLengthError if space is lower than 8 letters', () => {
    const password = 'Ab12#';
    const sut = Password.create(password);
    expect(sut.value).toEqual(new InvalidPasswordFormatError());
  });

  it('Should return PasswordLengthError if space is higher than 32 letters', () => {
    const password = 'Abc#56789012345678901234567890123';
    const sut = Password.create(password);
    expect(sut.value).toEqual(new InvalidPasswordFormatError());
  });

  it('Should return PasswordHasSpaceError if space in password', () => {
    const sut = Password.create('Abc123# 21');
    expect(sut.value).toEqual(new InvalidPasswordFormatError());
  });

  it('Should return PasswordMissingSpecialCharacterError if is missing special character in password', () => {
    const sut = Password.create('Abc12345');
    expect(sut.value).toEqual(new InvalidPasswordFormatError());
  });

  it('Should return PasswordMissingHigherCaseLetterError if is missing higher case letter in password', () => {
    const sut = Password.create('abc1234#');
    expect(sut.value).toEqual(new InvalidPasswordFormatError());
  });

  it('Should return PasswordMissingLowerCaseLetterError if is missing lower case letter in password', () => {
    const sut = Password.create('ABC1234#');
    expect(sut.value).toEqual(new InvalidPasswordFormatError());
  });

  it('Should return PasswordMissingNumberError if is missing number in password', () => {
    const sut = Password.create('Abcdefg#');
    expect(sut.value).toEqual(new InvalidPasswordFormatError());
  });
});
