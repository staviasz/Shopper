import { FieldIsRequired, InvalidField } from '@/domain/shared/errors';
import { Email } from './email-value-objects';

describe('Email Value Object', () => {
  it('Should return error if email is empty', () => {
    const email = Email.create('');
    expect(email.isLeft()).toBe(true);
    expect(email.isRight()).toBe(false);
    expect(email.value).toEqual(new FieldIsRequired('Email'));
  });

  it('Should return error if email is invalid', () => {
    const email = Email.create('teste');
    expect(email.isLeft()).toBe(true);
    expect(email.isRight()).toBe(false);
    expect(email.value).toEqual(new InvalidField('Email'));
  });

  it('Should correct email', () => {
    const email = Email.create('teste@teste.com');
    expect(email.value).toEqual({ props: 'teste@teste.com' });
  });
});
