import { Sequelize } from 'sequelize-typescript';
import CustomerFactory from '../../../../domain/customer/factory/customer.factory';
import Address from '../../../../domain/customer/value-object/address';
import CustomerMapper from '../../../../infrastructure/customer/sequelize/mapper/customer-mapper';
import CustomerMapperImplementation from '../../../../infrastructure/customer/sequelize/mapper/customer-mapper-implementation';
import CustomerModel from '../../../../infrastructure/customer/sequelize/model/customer.model';
import CustomerRepository from '../../../../infrastructure/customer/sequelize/repository/customer.repository';
import FindCustomerUseCase from '../find/find.customer.usecase';
import UpdateCustomerUseCases from './update.customer.usecases';

describe('Integration test for customer update use case', () => {
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

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository(mapper);
    const updateCustomerUseCases = new UpdateCustomerUseCases(
      customerRepository
    );

    const customer = CustomerFactory.createWithAddress(
      'John Doe',
      new Address('Street', 123, 'Zip', 'City')
    );

    await customerRepository.create(customer);

    const input = {
      id: customer.id,
      name: 'Herlander Bento',
      address: {
        street: 'Street',
        number: 123,
        zip: 'Zip',
        city: 'City',
      },
    };

    const output = {
      id: customer.id,
      name: 'Herlander Bento',
      address: {
        street: 'Street',
        number: 123,
        zip: 'Zip',
        city: 'City',
      },
    };

    const result = await updateCustomerUseCases.execute(input);

    expect(result).toEqual(output);

    const findCustomerUseCases = new FindCustomerUseCase(customerRepository);

    const result2 = await findCustomerUseCases.execute({ id: input.id });

    expect(result2).toEqual(output);
  });
});
