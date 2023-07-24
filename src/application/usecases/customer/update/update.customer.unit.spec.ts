import CustomerFactory from '../../../../domain/customer/factory/customer.factory';
import Address from '../../../../domain/customer/value-object/address';
import UpdateCustomerUseCases from './update.customer.usecases';

const customer = CustomerFactory.createWithAddress(
  'John Doe',
  new Address('Street', 123, 'Zip', 'City')
);

const input = {
  id: customer.id,
  name: 'Herlander Bento',
  address: {
    street: 'Street Updated',
    number: 1234,
    zip: 'Zip Updated',
    city: 'City Updated',
  },
};

const MockRepository = () => {
  return {
    findAll: jest.fn(),
    create: jest.fn(),
    findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn(),
  };
};

describe('Unit test for customer update use case', () => {
  it('should update a customer', async () => {
    const customerRepository = MockRepository();
    const updateCustomerUseCases = new UpdateCustomerUseCases(
      customerRepository
    );

    const output = await updateCustomerUseCases.execute(input);

    expect(output).toEqual(input);
  });
});
