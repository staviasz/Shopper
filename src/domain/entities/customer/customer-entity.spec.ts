import { CustomerEntity } from './customer-entity';

const dataCustomer = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  name: 'Customer',
  email: 'email@teste.com',
};

describe('Customer Entity', () => {
  it('Should correct instance of Customer', () => {
    const customer = CustomerEntity.create(dataCustomer);
    expect(customer.isRight()).toBeTruthy();
    expect(customer.value).toBeInstanceOf(CustomerEntity);

    const { id, name, email } = customer.value as CustomerEntity;
    expect(id).toEqual(dataCustomer.id);
    expect(name).toEqual(dataCustomer.name);
    expect(email).toEqual(dataCustomer.email);
  });
});
