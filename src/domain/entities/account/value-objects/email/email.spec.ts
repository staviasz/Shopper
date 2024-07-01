import { InvalidEmailFormatError } from '../../errors';
import { Email } from './email';

/**
 * @group domain
 * @group models
 * @group models/user
 */
describe('Email ValueObject', () => {
  it('Should return an Email if email is valid', () => {
    let sut;

    sut = Email.create('email@email.com');
    expect(sut.value).toEqual({ props: 'email@email.com' });

    sut = Email.create('email.email@email.com');
    expect(sut.value).toEqual({ props: 'email.email@email.com' });

    sut = Email.create('email.1234@email.com');
    expect(sut.value).toEqual({ props: 'email.1234@email.com' });

    sut = Email.create('email_email@email.com');
    expect(sut.value).toEqual({ props: 'email_email@email.com' });

    sut = Email.create('email+email@email.com');
    expect(sut.value).toEqual({ props: 'email+email@email.com' });

    sut = Email.create('email-email@email.com');
    expect(sut.value).toEqual({ props: 'email-email@email.com' });
  });

  it('Should return InvalidEmailFormatError if email contains special character before @', () => {
    const sut = Email.create('email$@email.com');
    expect(sut.value).toEqual(new InvalidEmailFormatError('email$@email.com'));
  });

  it('Should return InvalidEmailFormatError if email contains two dots in .com', () => {
    const sut = Email.create('email@email..com');
    expect(sut.value).toEqual(new InvalidEmailFormatError('email@email..com'));
  });

  it('Should return InvalidEmailFormatError if email starts with special character', () => {
    const sut = Email.create('.email@email.com');
    expect(sut.value).toEqual(new InvalidEmailFormatError('.email@email.com'));
  });

  it('Should return InvalidemailFormatError if email ends with especial character', () => {
    const sut = Email.create('email@email.com@');
    expect(sut.value).toEqual(new InvalidEmailFormatError('email@email.com@'));
  });

  it('Should return InvalidemailFormatError if email contains spaces before @', () => {
    const sut = Email.create('email @email.com');
    expect(sut.value).toEqual(new InvalidEmailFormatError('email @email.com'));
  });

  it('Should return InvalidemailFormatError if email contains spaces after @', () => {
    const sut = Email.create('email@email .com');
    expect(sut.value).toEqual(new InvalidEmailFormatError('email@email .com'));
  });
});
