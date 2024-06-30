import { Account } from './account';

describe('Account Entity', () => {
  it('Should create an Account on success', async () => {
    const date = new Date();

    const result = Account.create({
      id: 'any_id',
      email: 'fulano@teste.com',
      password: 'Abc1234#',
      permissions: ['andar'],
      createdAt: date,
      updatedAt: date,
      verifiedAt: date,
    });

    const account = result.value as Account;
    console.log(account.createdAt);
    console.log(account.updatedAt);
    console.log(account.verifiedAt);
    expect(account.id).toBe('any_id');
    expect(account.email).toBe('fulano@teste.com');
    expect(account.password).toBe('Abc1234#');
    expect(account.permissions[0]).toBe('andar');
    expect(account.createdAt).toBe(date);
    expect(account.updatedAt).toBe(date);
    expect(account.verifiedAt).toBe(date);
  });
});
