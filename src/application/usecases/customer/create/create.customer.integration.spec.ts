import { Sequelize } from 'sequelize-typescript';
import CustomerFactory from '../../../../domain/customer/factory/customer.factory';
import Address from '../../../../domain/customer/value-object/address';
import CustomerMapper from '../../../../infrastructure/customer/sequelize/mapper/customer-mapper';
import CustomerMapperImplementation from '../../../../infrastructure/customer/sequelize/mapper/customer-mapper-implementation';
import CustomerModel from '../../../../infrastructure/customer/sequelize/model/customer.model';
import CustomerRepository from '../../../../infrastructure/customer/sequelize/repository/customer.repository';
import CreateCustomerUseCases from './create.customer.usecases';

describe('Integration test create customer use cases', () => {
  const mapper: CustomerMapper = new CustomerMapperImplementation();
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository(mapper);
    const createCustomerUseCases = new CreateCustomerUseCases(
      customerRepository
    );

    const customer = CustomerFactory.createWithAddress(
      'John Doe',
      new Address('Street', 123, 'Zip', 'City')
    );

    await customerRepository.create(customer);

    const input = {
      name: 'John Doe',
      address: {
        street: 'Street',
        number: 123,
        zip: 'Zip',
        city: 'City',
      },
    };

    const result = await createCustomerUseCases.execute(input);

    const output = {
      id: result.id,
      name: 'John Doe',
      address: {
        street: 'Street',
        number: 123,
        zip: 'Zip',
        city: 'City',
      },
    };

    expect(result).toEqual(output);
  });
});
