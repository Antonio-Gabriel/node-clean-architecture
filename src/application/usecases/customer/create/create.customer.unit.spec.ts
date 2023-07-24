import CreateCustomerUseCases from './create.customer.usecases';

const input = {
  name: 'John Doe',
  address: {
    street: 'Street',
    number: 123,
    zip: 'Zip',
    city: 'City',
  },
};

const MockRepository = () => {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit test create customer use cases', () => {
  it('should create a customer', async () => {
    const customerRepository = MockRepository();
    const createCustomerUseCase = new CreateCustomerUseCases(
      customerRepository
    );

    const output = await createCustomerUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city,
      },
    });
  });

  it('should throw an error when name is missing', async () => {
    const customerRepository = MockRepository();
    const createCustomerUseCase = new CreateCustomerUseCases(
      customerRepository
    );

    input.name = '';

    await expect(createCustomerUseCase.execute(input)).rejects.toThrow(
      'Name is required'
    );
  });

  it('should throw an error when street is missing', async () => {
    const customerRepository = MockRepository();
    const createCustomerUseCase = new CreateCustomerUseCases(
      customerRepository
    );

    input.address.street = '';

    await expect(createCustomerUseCase.execute(input)).rejects.toThrow(
      'Street is required'
    );
  });
});
