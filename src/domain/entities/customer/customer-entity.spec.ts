import { FormatedEntityArrayErrors } from '@/domain/shared/errors';
import { CustomerEntity } from './customer-entity';

const dataCustomer = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  name: 'Customer',
  email: 'email@teste.com',
  acceptedTerms: true,
};

describe('Customer Entity', () => {
  it('Should correct instance of Customer', () => {
    const customer = CustomerEntity.create(dataCustomer);
    expect(customer.isRight()).toBeTruthy();
    expect(customer.value).toBeInstanceOf(CustomerEntity);

    const { id, name, email, acceptedTerms } = customer.value as CustomerEntity;

    expect(id).toEqual(dataCustomer.id);
    expect(name).toEqual(dataCustomer.name);
    expect(email).toEqual(dataCustomer.email);
    expect(acceptedTerms).toEqual(dataCustomer.acceptedTerms);
  });

  it('Should return all errors', () => {
    const customer = CustomerEntity.create({} as any);

    expect(customer.isLeft()).toBeTruthy();
    expect((customer as unknown as FormatedEntityArrayErrors).value.errorFormatted()).toEqual({
      errors: [
        'id is required',
        'id is invalid',
        'Name is required',
        'O nome deve ter pelo menos 3 caracteres e apenas letras',
        'Email is required',
        'Email is invalid',
        'Os termos de uso devem ser aceitos',
      ],
    });
  });
});
